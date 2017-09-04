const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils.js')
const entities = require('../../../data/entities.js')

module.exports = function(router) {

  router.get('/entities', [delayResponseMiddleware], function (req, res) {
    res.json(entities)
  })

  router.get('/entities/:id', [delayResponseMiddleware], function (req, res) {
    res.json(entities[req.params.id])
  })

  router.get('/entities/:id/returns', [delayResponseMiddleware], function (req, res) {
    res.json(entities[req.params.id])
  })

  return router
}
