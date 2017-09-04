const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const utils = require('../../../utils')
const jwt = require('jsonwebtoken')
const config = require('../../../config')

module.exports = function(router) {

  // define the about route
  router.post('/authenticate', delayResponseMiddleware, function (req, res) {

    let user = req.body.username

    if (user === "test" && req.body.password === "password") {

      let token = jwt.sign({
        "username" : user,
        "first_name" : "Rick",
        "last_name" : "Sanchez",
        "admin": true
      },
      config.secret,
      {
        expiresIn: 1440 // expires in 24 hours
      })

      // return the information including token as JSON
      res.json({
        code: 200,
        status: 'success',
        message: '',
        data: {
          token: token
        }

      })

    } else {
      res.status(401).json({
        code: 401,
        status: 'error',
        message: 'Username or password is incorrect',
        data: {}
      })
    }

  })

  return router
}
