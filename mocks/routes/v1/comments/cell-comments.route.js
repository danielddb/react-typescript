const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const commentUtils = require('../../../utils/comment.utils.js')
const responseUtils = require('../../../utils/response.utils.js')

module.exports = function(router) {

  // Get all cell comments
  router.get('/cells/comments', [delayResponseMiddleware], function (req, res) {
    res.json(commentUtils.getCellComments())
  })

  // Get all comments for a cells
  router.get('/cells/:id/comments', [delayResponseMiddleware], function (req, res) {
    res.json(commentUtils.getCellComments(req.params.id))
  })

  // Create new comment for that :id return
  router.post('/cells/:id/comments', [delayResponseMiddleware], function (req, res) {
    try {

      const body = req.body
      const comment = commentUtils.createCellComment(
        req.params.id,
        body.user,
        body.description,
        body.comment,
        body.include,
        body.attachment,
        body.previousInstanceIds
      )

      return res.json(comment)
    }
    catch(e) {
      console.log(e)
      return res.status(402).json(responseUtils.json402)
    }
  })

  // Get details on one comment
  router.get('/cells/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      const comment = commentUtils.getCommentById(req.params.comment_id)

      return res.json(comment)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  // Update details on one comment
  router.put('/cells/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      const body = req.body
      const comment = commentUtils.updateCellComment(req.params.id, req.params.comment_id, body.description, body.comment, body.include, body.attachment)

      return res.json(comment)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  // Delete a comment
  router.delete('/cells/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      commentUtils.deleteCellComment(req.params.id, req.params.comment_id)

      return res.sendStatus(204)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  return router
}
