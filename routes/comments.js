const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const {authentication, isAuthorComment} = require('../middlewares/authentication')

router.post('/newComment', authentication, CommentController.newComment)
router.put('/updateComment/:_id', authentication, isAuthorComment, CommentController.updateComment)
router.delete('/deleteComment/:_id', authentication, isAuthorComment, CommentController.deleteComment)
router.put('/likeComment/:_id', authentication, CommentController.likeComment)
router.delete('/removeLikeComment/:_id', authentication, CommentController.removeLikeComment)

module.exports = router