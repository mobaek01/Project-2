const mongoose = require('mongoose')
const Schema = mongoose.Schema

feedSchema = new Schema({
    username: {type:String, required:true},
    img: {type:String, required:true},
    caption: String,
    likes: Number,
    comments: [
        {
            author: String,
            feedback: String
        }
    ]
    },
    {timestamps:true}
)

const Feed = mongoose.model('Feed', feedSchema)
module.exports = Feed;
