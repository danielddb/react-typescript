const storage = require('node-persist')
const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const formUtils = require('../../../utils/form.utils')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function(router) {

  router.get('/products/:product_prefix/formInstance/:id', [delayResponseMiddleware], function (req, res) {
    try {
      const formInstanceId = req.params.id.toUpperCase()
      const productPrefix = req.params.product_prefix.toUpperCase()
      const formInstance = formUtils.getFormInstance(productPrefix, formInstanceId)

      return res.json(formInstance)
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

  router.get('/products/:product_prefix/formInstance/:id/cells', [delayResponseMiddleware], function (req, res) {
    try {
      const formInstanceId = req.params.id.toUpperCase()
      const productPrefix = req.params.product_prefix.toUpperCase()
      const cells = formUtils.getFormInstanceCells(productPrefix, formInstanceId)

      return res.json(cells)
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

  return router
}
