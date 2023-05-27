const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')
const Post = require('../models/Post')


const authentication = async(req, res, next) => {
    try {
      const token = req.headers.authorization
      const payload = jwt.verify(token, jwt_secret)
      const user = await User.findOne({ _id: payload._id, tokens: token}) 
      if(!user) {
        return res.status(401).send({message: 'you are not authorized'})
      }
      req.user = user
      next()
    } catch (error) {
      console.error(error) 
      return res.status(500).send({ message: 'There is a problem with token'}, error)
    }
} 

const isAuthor = async(req, res, next) => {
  try {
      const post = await Post.findById(req.params._id);
      if (post.userId.toString() !== req.user._id.toString()) {
          return res.status(403).send({ message: 'this post is not yours' });
      }
      next();
  } catch (error) {
      console.error(error)
      return res.status(500).send({ error, message: 'There is a problem' })
  }
}
const isAuthorComment = async(req, res, next) => {
  try {
      const comment = await Post.findOne({'comments._id':req.params._id});
      if (comment.userId.toString() !== req.user._id.toString()) {
          return res.status(403).send({ message: 'this comment is not yours' });
      }
      next();
  } catch (error) {
      console.error(error)
      return res.status(500).send({ error, message: 'There is a problem' })
  }
}

 




module.exports = {authentication, isAuthor, isAuthorComment}