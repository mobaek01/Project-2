const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true}
})

const User = mongoose.model('User', userSchema)
module.exports = User;
