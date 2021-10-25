const bcrypt = require('bcrypt')
const express = require('express')
const comments = express.Router()
const Comment = require('../models/comments.js')
const Feed = require('../models/feed.js')

///////////////////////////// COMMENT ///////////////////////////////////////

// comments.post('/:id', (req, res) => {
//     Feed.findById(req.params.id, (error, feed) => {
//         feed.comments.push(req.body)
//         feed.save((error, updatedComment) => {
//             res.redirect('/feed/:id')
//         })
//     })
// })

// comments.post('/:id/comment', (req, res) => {
//     Feed.findByIDAndUpdate((error, feed) => {
//         req.params.id,
//         feed.comments.push(req.body),
//         (error, updatedComment) => {
//             res.redirect('/feed/:id')
//         }
//     }
// })

// comments.post('/:id/comment', (req, res) => {
//     Feed.findByIdAndUpdate((error, feed) => {
//         req.params.id,
//         feed.comments.push(req.body),
//         (error, updateComment) => {
//             res.redirect('/feed/:id')
//         }
//     })
// })

// comments.post('/:id/comment', (req, res) => {
//     Feed.findByIdAndUpdate(req.params.id, (error, feed) => {
//         feed.comments.push(req.body),
//         (error, updateComment) => {
//             res.redirect('/feed/:id')
//         }
//     })
// })

module.exports = comments;
