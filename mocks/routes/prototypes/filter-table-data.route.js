const utils = require('../../utils.js')

module.exports = function(router) {

  // define the about route
  router.get('/filter-table', function (req, res) {
    res.json(generateData())
  })

  function generateData() {
    const arr = []
    const numOfRows = Math.floor(Math.random() * 1000)

    for ( let i = 0; i < numOfRows; i++ ) {
      let obj = {}
      let i2 = i + 1

      obj.id = i2
      obj.reference = utils.randomString()
      obj.description = `Row ${i2}`
      obj.val1 = utils.randomNumber(0, 1000000000)
      obj.val2 = utils.randomNumber(0, 1000000000)
      obj.difference = obj.val1 - obj.val2

      arr.push(obj)
    }

    return arr
  }

  return router
}
