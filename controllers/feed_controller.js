const express = require('express')
const router = express.Router()
const Feed = require('../models/feed.js')
const feedSeed = require('../models/seed.js')


///////////////////////////// READ ///////////////////////////////////////////

//// Index Route
router.get('/' , (req, res) => {
    Feed.find({}, (error, allFeeds) => {
        res.render(
            'feed/index.ejs',
            {
                feeds: allFeeds
            }
        )
    })
});

//// Show Route

router.get('/:id', (req, res) => {
    Feed.findById(req.params.id, (error, foundFeed) => {
        res.render(
            'feed/show.ejs',
            {
                feed: foundFeed
            }
        )
    })
})

///////////////////////////// SEED ///////////////////////////////////////////

router.get('/seed', (req, res) => {
    Feed.create(feedSeed, (error, data) => {
        res.redirect('/feed')
    })
})

module.exports = router;
