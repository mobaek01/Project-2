const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
    res.render(
        'user/new.ejs',
        {
            currentUser: req.session.currentUser,
            tabTitle: "REGISTER"
        }
    )
})

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
        console.log('user info has been created', createdUser);
        res.redirect('/')
    })
})

module.exports = users;
