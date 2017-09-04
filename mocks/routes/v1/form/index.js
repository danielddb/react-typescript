module.exports = function(router) {
  return [
    require('./form-instances.route')(router),
    require('./forms.route')(router)
  ]
}
