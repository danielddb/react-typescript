const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const productUtils = require('../../../utils/product.utils')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function (router) {

  router.get('/products', [delayResponseMiddleware], function (req, res) {
    res.json(productUtils.getProducts())
  })

  return router
}
