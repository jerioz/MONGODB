const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication } = require('../middlewares/authentication')

router.post('/newPost', authentication, PostController.newPost)
router.put('/updatePost/:_id', authentication, PostController.updatePost)
router.delete('/deletePost/:_id', authentication, PostController.deletePost)
router.get('/getByTitle/:title', PostController.getPostByTitle)
router.get('/getById/:_id', PostController.getPostById)

module.exports = router