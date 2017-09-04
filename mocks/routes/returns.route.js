const storage = require('node-persist')
const checkTokenMiddleware = require('../middlewares/check-token.middleware')
const delayResponseMiddleware = require('../middlewares/delay-response.middleware')
const utils = require('../utils.js')

module.exports = function(router) {

  // define the about route
  router.get('/returns/chart', [delayResponseMiddleware], function (req, res) {
    res.json({
      datasets:[  
      {  
         "type":"line",
         "label":"CRSAR001C001",
         "data":[  
            345,
            5000,
            5071
         ],
         "yAxisID":"value",
         "fill":false,
         "lineTension":0,
         "hidden":false
      }],
      labels: [
        '18/08/2017',
        '19/08/2017',
        '20/08/2017'
      ],
      options: {
        scales: {
          yAxes: [
            {
              position: 'left',
              id: 'value'
            }
          ]
        },
        legend: {
          position: 'right'
        }
      }
    })
  })

  router.get('/returns/table', [delayResponseMiddleware], function (req, res) {
    res.json(storage.getItemSync('returnTable'))
  })

  return router
}
