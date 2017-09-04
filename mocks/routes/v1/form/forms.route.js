const storage = require('node-persist')
const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const formUtils = require('../../../utils/form.utils')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function(router) {

  router.get('/products/:product_prefix/entities/:entity_code/forms', [delayResponseMiddleware], function (req, res) {
    try {
      const params = req.params

      return res.json(formUtils.getForms(params.product_prefix, params.entity_code))
    }
    catch(e) {
      switch(e) {
        case 402:
          res.status(402).json(responseUtils.json402)
          break;
      }
    }
  })

  router.get('/products/:product_prefix/entities/:entity_code/forms/:form_code/referenceDates', [delayResponseMiddleware], function (req, res) {
    try {
      const params = req.params

      return res.json(formUtils.getFormReferenceDates(params.product_prefix, params.entity_code, params.form_code))
    }
    catch(e) {
      switch(e) {
        case 402:
          res.status(402).json(responseUtils.json402)
          break;
      }
    }
  })

  router.get('/products/:product_prefix/entities/:entity_code/forms/:form_code/formVersions/:form_version/referenceDates', [delayResponseMiddleware], function (req, res) {
    try {
      const params = req.params

      return res.json(formUtils.getFormVersionReferenceDates(params.product_prefix, params.entity_code, params.form_code, params.form_version))
    }
    catch(e) {
      switch(e) {
        case 402:
          res.status(402).json(responseUtils.json402)
          break;
      }
    }
  })

  return router
}
