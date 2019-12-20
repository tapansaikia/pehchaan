const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware');

const Scheme = require('../../models/Schemes')

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Admin Works'
}));

// @route   GET api/schemes
// @desc    Get schemes
// @access  Public
router.get('/schemes', (req, res) => {
    Scheme.find()
        .sort({
            date: -1
        })
        .then(schemes => res.json(schemes))
        .catch(err => res.status(404).json({
            noschemesfound: 'No schemes found'
        }));
});


// @route   POST api/schemes
// @desc    Create Scheme
// @access  Private
router.post(
    '/scheme',
    (req, res) => {

        const newScheme = {};
        newScheme.text = req.body.text;
        newScheme.title = req.body.title;
        newScheme.link = req.body.link;
        newScheme.linktitle = req.body.linktitle;
        newScheme.kind = req.body.kind;

        new Scheme(newScheme).save().then(scheme => res.json(scheme));
    }
);


module.exports = router;