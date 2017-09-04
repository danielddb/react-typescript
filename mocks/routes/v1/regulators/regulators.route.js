const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils.js')
const regulators = require('../../../data/regulators.js')

module.exports = function(router) {

  //Gets a list of all regulators
  router.get('/regulators', [delayResponseMiddleware], function (req, res) {
    res.json(
      {
        code: 200,
        status: 'success',
        message: '',
        data: regulators
      }
    )
  })

  // Gets a specific regulator
  router.get('/regulators/:id', [delayResponseMiddleware], function (req, res) {
    res.json(
      {
        code: 200,
        status: 'success',
        message: '',
        data: regulators[req.params.id]
      }
    )
  })

  // Gets a list of all entities associated to a specific return
  router.get('/regulators/:id/entities', [delayResponseMiddleware], function (req, res) {
    res.json(
      {
        code: 200,
        status: 'success',
        message: '',
        data: regulators[req.params.id].entities
      }
    )
  })

  return router
}
