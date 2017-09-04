const storage = require('node-persist')

const cellsUtils = require('./cells.utils')

/**
 * CellGroup model:
 *
 * {
 *  id: number,
 *  name: string,
 *  default: boolean
 *  shared: boolean
 *  system: boolean
 *  cells?: [
 *    {
 *      id: number
 *      reference: string
 *      description: string
 *    }
 *  ]
 * }
 */

exports.createInitialCellGroups = createInitialCellGroups
exports.createCellGroup = createCellGroup
exports.newCellGroup = newCellGroup
exports.getCellGroups = getCellGroups
exports.getCellGroupsByFormId = getCellGroupsByFormId
exports.updateCellGroups = updateCellGroups
exports.updateCellGroup = updateCellGroup
exports.deleteCellGroup = deleteCellGroup
exports.getCellGroupById = getCellGroupById

function createInitialCellGroups(formId) {
  // TODO: Check productPrefix and formInstanceId exist in cellsUtils.cells
  const allFed = cellsUtils.cells['FED'][1]
  const allEcr = cellsUtils.cells['ECR'][8]

  return {
    1: [
      { id: 1, name: 'All', default: false, shared: false, system: true, cells: allEcr },
      { id: 2, name: 'Subtotal', default: true, shared: false, system: true, cells: allEcr.filter(c => c.cell.calculateField) },
      { id: 3, name: 'Custom ECR', default: false, shared: false, system: false, cells: allEcr.slice(0, 5) }
    ],
    2: [
      { id: 4, name: 'All', default: false, shared: false, system: true, cells: allFed },
      { id: 5, name: 'Subtotal', default: true, shared: false, system: true, cells: allFed.filter(c => c.cell.calculateField) },
      { id: 6, name: 'Custom FED', default: false, shared: false, system: false, cells: allFed.slice(0, 5) }
    ]
  }
}

// Gets cell groups array from storage
function getCellGroups() {
  return storage.getItemSync('cellGroups')
}

// Gets cell groups array from storage by `formId`
function getCellGroupsByFormId(formId) {
  const cellGroups = getCellGroups()

  // TODO: Return 404 if formId not in cellGroups

  return cellGroups[formId]
}

// Sets the cell groups in storage
function updateCellGroups(cellGroups) {
  return storage.setItemSync('cellGroups', cellGroups)
}

// Returns a new cellGroup object
function newCellGroup(formId, name, def, shared, system, cellIds) {
  const cellGroups = getCellGroupsByFormId(formId)

  // check if name and cell id are there
  // also check the cellGroup with the same name hasnt already been added
  if(!formId || !name || !cellIds || getCellGroupByPropertyValue(cellGroups, 'name', name)) {
    throw 402
  }

  const uniqueCellIds = uniqueNumbersFromArray(cellIds)

  // get cells by cell id
  const cells = uniqueCellIds
    .map(cellId => {
      try {
        return getCellById(formId, +cellId)
      }
      catch(e) {
        return null
      }
    })
    .filter(cell => cell !== null)

  return {
    id: Date.now(),
    name,
    default: def !== undefined ? def : false,
    shared: shared !== undefined ? shared : false,
    system: system !== undefined ? system : false,
    cells
  }
}

// Creates a cellGroup and updates cellGroups storage
function createCellGroup(formId, name, def, shared, cellIds) {
  // get cellGroups from storage
  let cellGroups = getCellGroupsByFormId(formId)
  let cellGroup

  // create new cellGroup
  try {
    cellGroup = newCellGroup(formId, name, def, shared, false, cellIds)
  }
  catch(e) {
    throw e
  }

  if (def === true) {
    cellGroups = cellGroups.map(g => { g.default = false; return g })
  }

  // add new cellGroup to list of cellGroups
  cellGroups.push(cellGroup)

  const allCellGroups = getCellGroups()
  allCellGroups[formId] = cellGroups

  // update cellGroups storage
  updateCellGroups(allCellGroups)

  // return the new cellGroup
  return cellGroup
}

// Gets a cellGroup by its `formId` property
function getCellGroupById(formId, cellGroupId) {
  const cellGroup = getCellGroupsByFormId(formId)

  if (cellGroup === undefined) throw 404

  const filteredCellGroup = getCellGroupByPropertyValue(cellGroup, 'id', cellGroupId)

  // if no cellGroup was found, throw error
  if(filteredCellGroup === undefined) throw 404

  // return filtered cellGroup
  return filteredCellGroup
}

// Gets a cellGroup by its key-value pair
function getCellGroupByPropertyValue(cellGroup, property, value) {
  return cellGroup.find(t => t[property] === value)
}

// Deletes a cellGroup by its `id` property and updates cellGroups storage
function deleteCellGroup(formId, cellGroupId) {
  const cellGroups = getCellGroupsByFormId(formId)

  let indexMatch

  // loop through cellGroups, find cellGroup by id and save reference to loop index
  cellGroups.forEach((t, i) => indexMatch = t.id == cellGroupId ? i : indexMatch)

  // if theres no index, no cellGroup was found so throw error
  if (typeof indexMatch !== 'number') {
    throw 404
  }

  // if the cellGroup is a system generated one, throw error as cannot be deleted
  if (cellGroups[indexMatch].system === true) {
    throw 403
  }

  // if the cellGroup is a default one, update the default to Subtotal
  if (cellGroups[indexMatch].default === true) {
    const subtotalIndex = cellGroups.findIndex(g => g.name === 'Subtotal')
    cellGroups[subtotalIndex].default = true
  }

  // remove cellGroup from cellGroups
  cellGroups.splice(indexMatch, 1)

  const allCellGroups = getCellGroups()
  allCellGroups[formId] = cellGroups

  // update cellGroups storage
  updateCellGroups(allCellGroups)
}

// Updates a cellGroup by its `id` property and updates cellGroups storage
function updateCellGroup(formId, cellGroupId, name, def, shared, cellIds) {
  let updatedCellGroup

  const uniqueCellIds = uniqueNumbersFromArray(cellIds)

  const cellGroups = getCellGroupsByFormId(formId)

  // loop through cellGroups and find a cellGroup ID match
  const updatedCellGroups = cellGroups.map(t => {
    if (t.id == cellGroupId) {

      const matchedCellGroup = getCellGroupByPropertyValue(cellGroups,'name', name)

      if (matchedCellGroup && matchedCellGroup.id !== cellGroupId) throw 402

      //update cellGroup properties
      t.name = name ? name: t.name
      t.default = def !== undefined ? def : t.default
      t.shared = shared !== undefined ? shared : t.shared

      // if there are cell ids
      if (uniqueCellIds) {
        // get cells by their id and add them to the cellGroup `cells` property
        t.cells = uniqueCellIds
          .map(cellId => {
            try {
              return getCellById(+formId, +cellId)
            }
            catch(e) {
              return null
            }
          })
          .filter(cell => cell !== null)
      }

      // store reference to updated cellGroup
      updatedCellGroup = t
    } else {
      if (def === true) {
        t.default = false
      } else if (t.default === false && t.name === 'Subtotal') {
        t.default = true
      }
    }

    return t
  })

  // if no cellGroups updated, throw an error
  if(!updatedCellGroup) {
    throw 404
  }

  const allCellGroups = getCellGroups()
  allCellGroups[formId] = updatedCellGroups

  // update cellGroups storage
  updateCellGroups(allCellGroups)

  // return the updated cellGroup
  return updatedCellGroup
}

// Gets a cell by its `id` property
function getCellById(formId, id) {
  let matchedCell

  // filter cells by id
  for (let cellGroup of getCellGroupsByFormId(formId)) {
    for (let cell of cellGroup.cells) {
      if(+cell.cellId === +id) {
        matchedCell = cell
        break
      }
    }

    if(matchedCell) break
  }

  // if no cells are found, throw error
  if(!matchedCell) {
    throw 404
  }

  // return cell as object
  return matchedCell
}

// filters unique numbers from an array
function uniqueNumbersFromArray(array) {
  return array.filter((elem, index, self) => {
    return index == self.indexOf(elem);
  })
}
