const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    comments: [
        {
            comment: String,
            userId: { type: ObjectId, ref: 'User' },
        }
    ],
    likes: [{ type: ObjectId }]

}, { timestamps: true })

PostSchema.index({
    title: "text",
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post