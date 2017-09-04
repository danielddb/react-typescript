const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils.js')

module.exports = function(router) {

  // define the about route
  router.get('/analysis/:id/variance', [delayResponseMiddleware], function (req, res) {
    res.json(utils.generateComments())
  })

  return router
}
