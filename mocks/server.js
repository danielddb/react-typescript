const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const router = express.Router()
const argv = require('minimist')(process.argv.slice(2))
const morgan = require('morgan')
const port = argv.port || argv.p || 9010
const jwt = require('jsonwebtoken')
const storage = require('node-persist')

// initialise storage
storage.initSync()

const routes = require('./routes')(router)
// const prototypeRoutes = require('./routes/prototypes')(router)
const apiRoutes = require('./routes/v1')(router)

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

// import routes
app.use('/', routes)
// app.use('/prototypes', prototypeRoutes)
app.use('/api', apiRoutes)

// use `public` directory to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, function () {
  console.log(`Mock server listening on port ${port}`)
})
