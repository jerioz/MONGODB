// const Comment = require('../models/Comment')


// const CommentController = {
//     async newCommentPost(req, res) {
//         try {
//            const comment = await Comment.findByIdAndUpdate({...req.body, postId: req.post._id}, {where: {_id: req.params._id}} ) 
         
//            res.send({message: 'comment added'})
//         } catch (error) {
//            console.error(error) 
//         }
//     }
// }

// module.exports = CommentController