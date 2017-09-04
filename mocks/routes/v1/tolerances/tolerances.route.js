const storage = require('node-persist')
const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils/tolerances.utils.js')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function(router) {

  storage.setItemSync('tolerances', [
    {
      id: 1,
      level: 'return',
      label: 'Under/Over 20',
      minAbsDiff: 100000,
      rangeUpper: 20,
      rangeLower: -20
    }
  ])

  router.get('/tolerances', [delayResponseMiddleware], function(req, res) {
    try {
      const tolerances = utils.getTolerances()

      res.json(tolerances)
    } catch (e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  router.post('/tolerances', [delayResponseMiddleware], function(req, res) {
    try {
      const body = req.body
      const tolerance = utils.addTolerance(body)

      return res.status(201).json(tolerance)
    } catch (e) {
      return res.status(402).json(responseUtils.json402)
    }
  })

  router.put('/tolerances/:id', [delayResponseMiddleware], function(req, res) {
    try {
      const id = req.params.id
      const body = req.body
      const tolerance = utils.updateTolerance(id, body)

      return res.json(tolerance)
    } catch (e) {
      switch(e) {
        case 402:
          res.status(402).json(responseUtils.json402)
          break

        case 404:
          res.status(404).json(responseUtils.json404)
          break
      }
    }
  })

  router.delete('/tolerances/:id', [delayResponseMiddleware], function(req, res) {
    try {
      const id = req.params.id
      utils.deleteTolerance(id)

      return res.status(200).send(id)
    } catch (e) {
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