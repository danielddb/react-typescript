module.exports = function(router) {
  return [
    require('./report.route')(router),
    require('./cell-groups.route')(router),
    require('./trends.route')(router),
    require('./variance.route')(router)
  ]
}
