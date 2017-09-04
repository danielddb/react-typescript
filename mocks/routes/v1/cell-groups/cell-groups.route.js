const storage = require('node-persist')
const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const cellGroupUtils = require('../../../utils/cell-group.utils')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function(router) {

  storage.setItemSync('cellGroups', cellGroupUtils.createInitialCellGroups())

  // Get all cellGroups for a return
  router.get('/returns/:id/cell-groups', [delayResponseMiddleware], function (req, res) {
    const cellGroupsWithoutCells = cellGroupUtils
      .getCellGroupsByFormId(+req.params.id)
      .map(cellGroup => { delete cellGroup.cells; return cellGroup })

    res.json(cellGroupsWithoutCells)
  })

  // Get one cellGroup for a return
  router.get('/returns/:id/cell-groups/:cellGroup_id', [delayResponseMiddleware], function (req, res) {
    try {
      const cellGroup = cellGroupUtils.getCellGroupById(+req.params.id, +req.params.cellGroup_id)

      return res.json(cellGroup)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  // Create new cellGroup for a return
  router.post('/returns/:id/cell-groups', [delayResponseMiddleware], function (req, res) {
    try {
      const body = req.body
      const cellGroup = cellGroupUtils.createCellGroup(+req.params.id, body.name, body.default, body.shared, body.cellIds)

      return res.status(201).json(cellGroup)
    }
    catch(e) {
      return res.status(402).json(responseUtils.json402)
    }
  })

  // Update details on one cellGroup
  router.put('/returns/:id/cell-groups/:cellGroup_id', [delayResponseMiddleware], function (req, res) {
    try {
      const body = req.body
      const cellGroup = cellGroupUtils.updateCellGroup(+req.params.id, +req.params.cellGroup_id, body.name, body.default, body.shared, body.cellIds)

      return res.json(cellGroup)
    }
    catch(e) {
      switch(e) {
        case 402:
          res.status(402).json(responseUtils.json402)
          break;

        case 404:
          res.status(404).json(responseUtils.json404)
          break;
      }
    }
  })

  // Delete a cellGroup
  router.delete('/returns/:id/cell-groups/:cellGroup_id', [delayResponseMiddleware], function (req, res) {
    try {
      cellGroupUtils.deleteCellGroup(+req.params.id, +req.params.cellGroup_id)

      return res.sendStatus(204)
    }
    catch(e) {
      switch(e) {
        case 403:
          res.status(403).json(responseUtils.json403)
          break;

        case 404:
          res.status(404).json(responseUtils.json404)
          break;
      }
    }
  })

  return router
}
