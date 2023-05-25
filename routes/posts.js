const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication, isAuthor} = require('../middlewares/authentication')
const CommentController = require('../controllers/CommentController')

router.post('/newPost', authentication, PostController.newPost)
router.put('/updatePost/:_id', authentication, isAuthor, PostController.updatePost)
router.delete('/deletePost/:_id', authentication, isAuthor, PostController.deletePost)
router.get('/getByTitle/:title', PostController.getPostByTitle)
router.get('/getById/:_id', PostController.getPostById)
router.get('/getAll', PostController.getAll)
router.post('/newCommentPost/:_id', PostController.newCommentPost)

module.exports = router