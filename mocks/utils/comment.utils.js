const storage = require('node-persist')
const utils = require('../utils.js')

/**
 * Comment model:
 *
 * {
 *  id: number,
 *  time: Date,
 *  user: string,
 *  description: string
 *  comment: string
 *  include: boolean
 *  type?: string
 *  attachment: [{
 *    name: string
 *    url: string
 *  }]
 * }
 */

exports.createComment = createComment
exports.getCommentById = getCommentById
exports.deleteComment = deleteComment
exports.updateComment = updateComment
exports.getComments = getComments
exports.getCellComments = getCellComments
exports.createCellComment = createCellComment
exports.updateCellComment = updateCellComment
exports.deleteCellComment = deleteCellComment
exports.getCellCommentById = getCellCommentById

// Gets comments array from storage
function getComments() {
  return storage.getItemSync('comments')
}

// Gets a comment by its `id` property
function getCommentById(commentId) {
  // filter comments by id
  const filteredComments = getComments().filter(c => {
    return c.id == commentId
  })

  // if no comments are found, throw error
  if(filteredComments.length === 0) {
    throw 404
  }

  // return filtered comment as object
  return filteredComments[0]
}

function getCellComments(id) {
  const comments = storage.getItemSync('cellComments')

  if ( !comments || comments.length === 0 ) {
    throw 404
  }

  if ( !id ) {
    return comments
  } else {
    const idComments = comments.filter(c => c.cellId == id)

    if ( !idComments || idComments.length === 0 ) {
      throw 404
    }

    return idComments[0].comments
  }


}

function getCellCommentById(cellId, commentId) {
  const allComments = storage.getItemSync('cellComments')

  if ( !allComments || allComments.length === 0 ) {
    return 404
  }

  const cell = allComments.filter(comment => comment.cellId == cellId)

  if ( !cell || cell.length === 0 ) {
    return 404
  }

  const comment = cell[0].comments.filter(c => c.id == commentId)

  if ( !comment || comment.length === 0 ) {
    return 404
  }

  return comment[0]
}

// Sets the comments in storage
function updateComments(item, comments) {
  return storage.setItemSync(item, comments)
}

// Returns a new comment object
// NOTE: no attachment data is used yet so just left as empty object
function newComment(user, description, comment, include, attachment, previousInstanceIds, prevVal, currVal) {

  const randomValues = [['660,000', '690,000'], ['680,000', '579,500'], ['190,000', '202,980'], ['560,000', '530,400']]
  const randomValue = randomValues[Math.floor(Math.random() * randomValues.length)]

  const previous = `2015/12/20: ${randomValue[0]}`
  const current = `2016/01/20: ${randomValue[1]}`

  const attachmentArr = []

  for ( let fileName in attachment ) {
    // Here would be where you would actually save the attachments

    attachmentArr.push({
      name: fileName,
      url: `api/documents/${fileName}`
    })
  }

  const types = ['Adjustment', 'Trends', 'Variance']

  return {
    id: Date.now(),
    time: new Date().getTime(),
    user,
    time: new Date,
    type: types[utils.randomNumber(0, 3)],
    action: utils.randomBoolean() ? 'add' : 'modify',
    description,
    comment,
    attachment: attachmentArr,
    include,
    previousInstanceIds,
    previous,
    current,
    audits: utils.generateCommentAudit(1, previous, current)
  }
}

// Creates a comment and updates comments storage
function createComment(user, description, comment, include, attachment) {
  if(!user || !description || !comment) {
    throw 402
  }

  // get comments from storage
  const comments = getComments()

  // create new comment
  const c = newComment(user, description, comment, include, attachment)

  // add new comment to list of comments
  comments.push(c)

  // update comments storage
  updateComments('comments', comments)

  // return the new comment
  return c
}

function createCellComment(cellId, user, description, comment, include, attachment, previousInstanceIds) {
  if(!user || !description || !comment) {
    throw 402
  }

  const comments = storage.getItemSync('cellComments')

  if ( !comments || comments.length === 0 ) {
    throw 404
  }

  const cellComments = comments.filter(comment => comment.cellId == cellId)

  if ( !cellComments || cellComments.length === 0 ) {
    throw 404
  }

  // // Backend Magic (get previous and current values of cell)
  // // ヽ( ͡͡ ° ͜ ʖ ͡ °)⊃━☆ﾟ. * ･ ｡ﾟ
  // const tableData = storage.getItemSync('returnTable')
  // const cell = tableData[cellId]
  // const prevVal = cell.prior[0].value
  // const currVal = cell.current.value

  // create new comment
  const c = newComment(user, description, comment, include, attachment, previousInstanceIds/*,prevVal, currVal*/)

  // add new comment to list of comments
  cellComments[0].comments.push(c)
  const newComments = comments.map(comment => comment.cellId != cellId ? comment : cellComments[0])

  // update comments storage
  updateComments('cellComments', newComments)

  // update comment count on table data
  // const newTableData = tableData.map(data => data.id == cellId ? Object.assign(cell, { numOfComments: cell.numOfComments + 1 }) : data )
  // storage.setItemSync('returnTable', newTableData)

  // return the new comment
  return c
}

// Updates a comment by its `id` property and updates comments storage
function updateComment(commentId, description, comment, include, attachment) {
  let updatedComment

  // loop through comments and find a comment ID match
  const updatedComments = getComments().map(c => {
    if (c.id == commentId) {

      //update comment properties
      c.comment = comment ? comment: c.comment
      c.description = description ? description: c.description
      c.include = include

      const attachmentArr = []

      for ( let fileName in attachment ) {
        // Here would be where you would actually save the attachments

        attachmentArr.push({
          name: fileName,
          url: `api/documents/${fileName}`
        })
      }

      c.attachment = attachmentArr

      // store reference to updated comment
      updatedComment = c
    }

    return c
  })

  // if no comments updated, throw an error
  if(!updatedComment) {
    throw 404
  }

  // update comments storage
  updateComments('comments', updatedComments)

  // return the updated comment
  return updatedComment
}

function updateCellComment(cellId, commentId, description, comment, include, attachment) {
  const allCellComments = storage.getItemSync('cellComments')

  if ( !allCellComments || allCellComments.length === 0 ) {
    throw 404
  }

  const cellComments = allCellComments.filter(c => c.cellId == cellId)

  if ( !cellComments || cellComments.length === 0 ) {
    throw 404
  }

  const commentToUpdate = cellComments[0].comments.filter(c => c.id == commentId)

  if ( !commentToUpdate || commentToUpdate.length === 0 ) {
    throw 404
  }

  const attachmentArr = []

  for ( let fileName in attachment ) {
    // Here would be where you would actually save the attachments

    attachmentArr.push({
      name: fileName,
      url: `api/documents/${fileName}`
    })
  }

  const updatedComment = Object.assign(commentToUpdate[0], {
    description: description ? description : commentToUpdate.description,
    comment: comment ? comment : commentToUpdate.comment,
    include,
    attachment: attachmentArr
  })

  if ( !updatedComment ) {
    throw 404
  }

  const newComments = cellComments[0].comments.map(c => c.id != commentId ? c : updatedComment)
  const updatedComments = allCellComments.map(c => c.cellId != cellId ? c : Object.assign(c, { comments: newComments }))

  storage.setItemSync('cellComments', updatedComments)

  // return the updated comment
  return updatedComment
}

// Deletes a comment by its `id` property and updates comments storage
function deleteComment(commentId) {
  const comments = getComments()

  let indexMatch

  // loop through comments, find comment by id and save reference to loop index
  comments.forEach((c, i) => indexMatch = c.id == commentId ? i : indexMatch)

  // if theres no index, no comment was found so throw error
  if (typeof indexMatch !== 'number') {
    throw 404
  }

  // remove comment from comments
  comments.splice(indexMatch, 1)

  // update comments storage
  storage.setItemSync('comments', comments)
}

function deleteCellComment(cellId, commentId) {
  const comments = storage.getItemSync('cellComments')

  if ( !comments || comments.length === 0 ) {
    throw 404
  }

  const cellComments = comments.filter(c => c.cellId == cellId)

  if ( !cellComments || cellComments.length === 0 ) {
    throw 404
  }

  let indexMatch

  cellComments[0].comments.forEach((c, i) => indexMatch = c.id == commentId ? i : indexMatch)

  if (typeof indexMatch !== 'number') {
    throw 404
  }

  cellComments[0].comments.splice(indexMatch, 1)

  const newComments = comments.map(c => c.cellId != cellId ? c : Object.assign(c, { comments: cellComments[0].comments }))

  // update comments storage
  storage.setItemSync('cellComments', newComments)

  const tableData = storage.getItemSync('returnTable')
  const cell = tableData.filter(data => data.id == cellId)
  const newTableData = tableData.map(data => data.id == cellId ? Object.assign(cell[0], { numOfComments: cell[0].numOfComments - 1 }) : data )
  storage.setItemSync('returnTable', newTableData)
}
