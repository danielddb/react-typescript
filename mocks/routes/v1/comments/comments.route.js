const storage = require('node-persist')
const delayResponseMiddleware = require('../../../middlewares/delay-response.middleware')
const checkTokenMiddleware = require('../../../middlewares/check-token.middleware')
const commentUtils = require('../../../utils/comment.utils.js')
const responseUtils = require('../../../utils/response.utils.js')

const fs = require('fs')

module.exports = function(router) {

  // Set initial storage values
  storage.setItemSync('comments', [])

  // Get all comments for a return
  router.get('/returns/:id/comments', [delayResponseMiddleware], function (req, res) {
    res.json(commentUtils.getComments())
  })

  // Create new comment for that :id return
  router.post('/returns/:id/comments', [delayResponseMiddleware], function (req, res) {
    try {
      const body = req.body
      const comment = commentUtils.createComment(body.user, body.description, body.comment, body.include, body.attachment)

      return res.json(comment)
    }
    catch(e) {
      return res.status(402).json(responseUtils.json402)
    }
  })

  // Get details on one comment
  router.get('/returns/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      const comment = commentUtils.getCommentById(req.params.comment_id)

      return res.json(comment)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  // Update details on one comment
  router.put('/returns/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      const body = req.body
      const comment = commentUtils.updateComment(req.params.comment_id, body.description, body.comment, body.include, body.attachment)

      return res.json(comment)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  // Delete a comment
  router.delete('/returns/:id/comments/:comment_id', [delayResponseMiddleware], function (req, res) {
    try {
      commentUtils.deleteComment(req.params.comment_id)

      return res.sendStatus(204)
    }
    catch(e) {
      return res.status(404).json(responseUtils.json404)
    }
  })

  return router
}
