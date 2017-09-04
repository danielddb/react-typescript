module.exports = function(router) {
  return [
    require('./regulators/regulators.route')(router),
    require('./regulators/entities.route')(router),
    require('./comments/comments.route')(router),
    require('./comments/cell-comments.route')(router),
    require('./documents/documents.route')(router),
    require('./form')(router),
    require('./authenticate/authenticate.route')(router),
    require('./returns/returns.route')(router),
    require('./entities/entities.route')(router),
    require('./products/products.route')(router),
    require('./tolerances/tolerances.route')(router),
    require('./cell-groups/cell-groups.route')(router),
    require('./analysis')(router)
  ]
}
