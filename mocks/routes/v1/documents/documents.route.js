const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const utils = require('../../../utils.js')

module.exports = function(router) {

  router.get('/documents/:name', [delayResponseMiddleware], function (req, res, next) {
    res.download(__dirname +'/../../../public/docs/test-document.dotx', req.params.name + '.dotx');
  })

  return router
}
