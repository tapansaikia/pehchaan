const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware');

const Event = require('../../models/Event')

// @route   GET api/event/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Event Works'
}));

// @route   GET api/events
// @desc    Get events
// @access  Public
router.get('/', (req, res) => {
    Event.find()
        .sort({
            date: -1
        })
        .then(events => res.json(events))
        .catch(err => res.status(404).json({
            noeventsfound: 'No events found'
        }));
});


// @route   POST api/event
// @desc    Create Event
// @access  Private
router.post(
    '/',
    withAuth,
    (req, res) => {

        const newEvent = {};
        newEvent.user = req.id;
        newEvent.title = req.body.title;
        newEvent.description = req.body.description;
        newEvent.eventDate = req.body.eventDate;
        newEvent.eventTime = req.body.eventTime;
        newEvent.venue = req.body.venue;

        console.log("eventdata", newEvent)
        new Event(newEvent).save()
            .then(event => res.json(event))
    }
);


module.exports = router;