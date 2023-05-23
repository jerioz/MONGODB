const Post = require('../models/Post')

const PostController =  {
    async newPost(req, res) {
        try {
           const post = await Post.create(req.body)
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
    }
}


module.exports = PostController