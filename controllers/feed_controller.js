const express = require('express')
const router = express.Router()
const Feed = require('../models/feed.js')
const feedSeed = require('../models/seed.js')
const Comment = require('../models/comments.js')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

///////////////////////////// COMMENT ///////////////////////////////////////////

router.post('/:id/comment', (req, res) => {
    Comment.create(req.body, (error, addedComment) => {
        Feed.findByIdAndUpdate(req.params.id, {$push: {comments: addedComment.id}},
        (error, updatedFeed) => {
            res.redirect(`/feed/${req.params.id}`)
        })
    })
})

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

router.delete('/:id', isAuthenticated, (req, res) => {
    Feed.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect('/feed')
    })
})

///////////////////////////// UPDATE /////////////////////////////////////////

//// EDIT Route

router.get('/:id/edit', isAuthenticated, (req, res) => {
    Feed.findById(req.params.id, (error, foundFeed) => {
        res.render(
            'feed/edit.ejs',
            {
                feed: foundFeed,
                currentUser: req.session.currentUser,
                tabTitle: "EDIT"
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

router.get('/new', isAuthenticated, (req, res) => {
    res.render(
        'feed/new.ejs',
        {
            currentUser: req.session.currentUser,
            tabTitle: "CREATE"
        }
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
                currentUser: req.session.currentUser,
                tabTitle: "HOME"
            }
        )
    })
});

//// SHOW Route

router.get('/:id', isAuthenticated, (req, res) => {
    Feed.findById(req.params.id, (error, foundFeed) => {
        Comment.find({_id: {$in: foundFeed.comments}}, (error, foundComment) => {
            res.render(
                'feed/show.ejs',
                {
                    feed: foundFeed,
                    comment: foundComment,
                    currentUser: req.session.currentUser,
                    tabTitle: "VIEW"
                }
            )
        })
    })
})

module.exports = router;
