const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const {authentication, isAuthorComment} = require('../middlewares/authentication')

router.post('/newComment', authentication, CommentController.newComment)
router.put('/updateComment/:_id', authentication, isAuthorComment, CommentController.updateComment)
router.delete('/deleteComment/:_id', authentication, isAuthorComment, CommentController.deleteComment)

module.exports = router