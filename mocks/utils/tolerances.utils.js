const storage = require('node-persist')

/**
 * Tolerance model:
 *
 * {
 *  id: number,
 *  level: string,
 *  label: string,
 *  minAbsDiff: number,
 *  rangeUpper: number,
 *  rangeLower: number,
 *  cellRef?: string
 * }
 */

exports.getTolerances = getTolerances
exports.addTolerance = addTolerance
exports.updateTolerance = updateTolerance
exports.deleteTolerance = deleteTolerance

function getTolerances() {
  return storage.getItemSync('tolerances')
}

function setTolerances(tolerances) {
  return storage.setItemSync('tolerances', tolerances)
}

function addTolerance(newTolerance) {
  if ( !checkTolerance(newTolerance) ) {
    throw 402
  }

  const tolerances = storage.getItemSync('tolerances')
  let currentId

  if ( tolerances.length > 0 ) {
    currentId = tolerances[tolerances.length - 1].id
  } else {
    currentId = 0
  }

  const newId = currentId + 1
  const tolerance = Object.assign(newTolerance, { id: newId })

  tolerances.push(tolerance)

  setTolerances(tolerances)

  return tolerance
}

function updateTolerance(id, update) {
  if ( !checkTolerance(update) ) {
    throw 402
  }

  const tolerances = storage.getItemSync('tolerances')
  const toleranceToUpdate = tolerances.filter(t => t.id == id)

  if ( !toleranceToUpdate || toleranceToUpdate.length == 0 ) {
    throw 404
  }

  const newTolerance = Object.assign(toleranceToUpdate[0], {
    level: update.level ? update.level : toleranceToUpdate.level,
    label: update.label ? update.label : toleranceToUpdate.label,
    minAbsDiff: update.minAbsDiff ? update.minAbsDiff : toleranceToUpdate.minAbsDiff,
    rangeUpper: update.rangeUpper ? update.rangeUpper : toleranceToUpdate.rangeUpper,
    rangeLower: update.rangeLower ? update.rangeLower : toleranceToUpdate.rangeLower,
    cellRef: update.cellRef ? update.cellRef : toleranceToUpdate.cellRef
  })

  const newTolerances = tolerances.map(t => {
    if ( t.id != id ) {
      return t
    }

    return newTolerance
  })

  setTolerances(newTolerances)

  return newTolerance
}

function deleteTolerance(id) {
  const tolerances = storage.getItemSync('tolerances')
  let indexMatch

  tolerances.forEach((t, i) => indexMatch = t.id == id ? i : indexMatch)

  if ( typeof indexMatch !== 'number' ) {
    throw 404
  }

  tolerances.splice(indexMatch, 1)

  setTolerances(tolerances)
}

function checkTolerance(tolerance) {
  if (
    !tolerance.level ||
    !tolerance.label ||
    !Number.isInteger(tolerance.minAbsDiff) ||
    !Number.isInteger(tolerance.rangeUpper) ||
    !Number.isInteger(tolerance.rangeLower)
  ) {
    return false
  }

  return true
}
