const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const withAuth = require('../../middleware');
// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Profile Works'
}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    withAuth,
    (req, res) => {
        const errors = {};

        Profile.findOne({
            user: req.id
        })
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'There are no profiles'
        }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({
        handle: req.params.handle
    })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.params.user_id
    })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({
                profile: 'There is no profile for this user'
            })
        );
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
    '/',
    withAuth,
    (req, res) => {
        console.log(req.body)
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }


        // Get fields
        const profileFields = {};
        profileFields.user = req.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.name) profileFields.name = req.body.name;
        if (req.body.gender) profileFields.gender = req.body.gender;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.age) profileFields.age = req.body.age;
        if (req.body.disability) profileFields.disability = req.body.disability;
        if (req.body.bio) profileFields.bio = req.body.bio;

        //get name from User's collection
        User.findById(req.id)
            .then(user => {
                profileFields.name = user.name,
                    profileFields.email = user.email
                profileFields.avatar = user.avatar
            })
        // Create or Edit current user profile with unique handle
        Profile
            .findOne({
                user: req.id
            })
            .then(profile => {
                // If profile not exist, then create a new one, Otherwise just update 

                // Create new profile
                if (!profile) {
                    // Check if handle exists (handle should be unoque for all profile)
                    Profile
                        .findOne({
                            handle: profileFields.handle
                        })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'handle already exists';
                                res.status(400).json(errors);
                            }
                        });
                    new Profile(profileFields).save().then(profile => res.json(profile));
                }
                // Update the profile
                else {
                    // Check if handle exists for other user
                    Profile
                        .findOne({
                            handle: profileFields.handle
                        })
                        .then(p => {
                            if (profile.handle !== p.handle) {
                                errors.handle = 'handle already exists';
                                res.status(400).json(errors);
                            }
                        });
                    Profile
                        .findOneAndUpdate({
                            user: req.id
                        }, {
                            $set: profileFields
                        }, {
                            new: true
                        })
                        .then(profile => res.json(profile));
                }
            });
    }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    withAuth,
    (req, res) => {
        Profile.findOneAndRemove({
            user: req.id
        }).then(() => {
            User.findOneAndRemove({
                _id: req.id
            }).then(() =>
                res.json({
                    success: true
                })
            );
        });
    }
);

module.exports = router;