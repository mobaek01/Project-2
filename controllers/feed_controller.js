const express = require('express')
const router = express.Router()
const Feed = require('../models/feed.js')
const feedSeed = require('../models/seed.js')

///////////////////////////// SEED ///////////////////////////////////////////

router.get('/seed', (req, res) => {
    Feed.create(feedSeed, (error, data) => {
        res.redirect('/feed')
    })
})

///////////////////////////// LIKE BTN ///////////////////////////////////////

router.put('/:id/like', (req, res) => {
    Feed.findByIdAndUpdate(
        req.params.id,
        {$inc:{likes: 1}},
        (error, updatedFeed) => {
            res.redirect('/feed')
        }
    )
})

///////////////////////////// DELETE ////////////////////////////////////////

router.delete('/:id', (req, res) => {
    Feed.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect('/feed')
    })
})

///////////////////////////// UPDATE /////////////////////////////////////////

//// EDIT Route

router.get('/:id/edit', (req, res) => {
    Feed.findById(req.params.id, (error, foundFeed) => {
        res.render(
            'feed/edit.ejs',
            {
                feed: foundFeed
            }
        )
    })
})

//// UPDATE Route

router.put('/:id', (req, res) => {
    Feed.findByIdAndUpdate(
        req.params.id,
        req.body,
        (error, updatedFeed) => {
            res.redirect('/feed')
        }
    )
})

///////////////////////////// CREATE //////////////////////////////////////////

//// NEW Route

router.get('/new', (req, res) => {
    res.render(
        'feed/new.ejs'
    )
})

//// CREATE Route

router.post('/', (req, res) => {
    Feed.create(req.body, (error, feedCreated) => {
        res.redirect('/feed')
    })
})

///////////////////////////// READ ///////////////////////////////////////////

//// INDEX Route
router.get('/' , (req, res) => {
    Feed.find({}, (error, allFeeds) => {
        res.render(
            'feed/index.ejs',
            {
                feeds: allFeeds,
            }
        )
    })
});

//// SHOW Route

router.get('/:id', (req, res) => {
    Feed.findById(req.params.id, (error, foundFeed) => {
        res.render(
            'feed/show.ejs',
            {
                feed: foundFeed,
            }
        )
    })
})

module.exports = router;
