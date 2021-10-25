const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
    res.render(
        'session/new.ejs',
        {
            currentUser: req.session.currentUser,
            tabTitle: "LOGIN"
        }
    )
})

sessions.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error, foundUser) => {
        if(error) {
            res.send('The database had a problem')
        } else if (!foundUser) {
            res.send('<a href = "/">Sorry, your username cannot be found</a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/')
            } else {
                res.send('<a href = "/">Your password does not match</a>')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions;
