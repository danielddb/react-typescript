const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const entityUtils = require('../../../utils/entity.utils')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function (router) {

  router.get('/products/:product_prefix/entities', [delayResponseMiddleware], function (req, res) {
    try {
      return res.json(entityUtils.getEntities(req.params.product_prefix.toUpperCase()))
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
