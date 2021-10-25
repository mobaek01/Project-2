const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    author: String,
})

const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment;
