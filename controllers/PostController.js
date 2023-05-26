const Post = require('../models/Post')



const PostController =  {
    async newPost(req, res) {
        try {
           const post = await Post.create({...req.body, userId: req.user._id})
           res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There is a problem'})
        }
    },
    async updatePost(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, {new: true})
          res.send({message: 'post succesfully updated', post}) 
        } catch (error) {
          console.error(error)
          res.send({message: 'There is a problem'}, error)  
        }
    },
    async deletePost(req, res) {
        try {
          const post = await Post.findByIdAndDelete(req.params._id)
          res.send({message: 'post deleted'})
        } catch (error) {
         console.error(error)
         res.status(500).send({message: 'There is a problem'}) 
        }
    },
    async getPostByTitle(req, res) {
        try {
            const post = await Post.find({
                $text: {
                    $search: req.params.title
                }
            })
            res.send(post)
        } catch (error) {
        console.error(error)    
        }
    },
    async getPostById(req, res) {
        try {
           const post = await Post.findById(req.params._id) 
           res.send(post)
        } catch (error) {
          console.error(error)  
        }
    },
    async getAll(req, res) {
        try {
            const {page = 1, limit= 10} = req.query
           const posts = await Post.find().populate('userId')
           .limit(limit)
           .skip((page -1) * limit)
           res.send(posts) 
        } catch (error) {
           console.error(error) 
        }
    },
    async newCommentPost(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id,
                { $push: {comments: {comment: req.body.comment, userId: req.user._id}}},
                {new:true})
                res.send(post)
            }catch {
                console.error(error)  
                res.send({message: 'There is a problem'})
            }
        }
    }


module.exports = PostController