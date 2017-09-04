const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils.js')

module.exports = function(router) {

  router.get('/returns', [delayResponseMiddleware], function (req, res) {
    res.json(regulators[req.params.id].entities[req.params.ent])
  })

  router.get('/returns/:id', [delayResponseMiddleware], function (req, res) {
    res.json(regulators[req.params.id].entities[req.params.ent])
  })

  return router
}
