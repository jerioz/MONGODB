const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication, isAuthor, isAuthorComment} = require('../middlewares/authentication')


router.post('/newPost', authentication, PostController.newPost)
router.put('/updatePost/:_id', authentication, isAuthor, PostController.updatePost)
router.delete('/deletePost/:_id', authentication, isAuthor, PostController.deletePost)
router.get('/getByTitle/:title', PostController.getPostByTitle)
router.get('/getById/:_id', PostController.getPostById)
router.get('/getAll', PostController.getAll)
router.put('/newCommentPost/:_id', authentication, PostController.newCommentPost)
router.put('/like/:_id', authentication, PostController.like)
router.delete('/deleteLike/:_id', authentication, PostController.deletelike)
// router.put('/updateCommentPost/:_id', authentication, isAuthorComment, PostController.updateCommentPost)
// router.delete('/deleteCommentPost/:_id', authentication, isAuthorComment, PostController.deleteCommentPost)





module.exports = router