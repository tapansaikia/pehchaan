const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware');

const User = require('../../models/User')

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Posts Works'
}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostsfound: 'No posts found'
        }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({
                    nopostfound: 'No post found with that ID'
                })
            }
        })
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
    '/',
    withAuth,
    (req, res) => {
        const {
            errors,
            isValid
        } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        const newPost = {};
        newPost.text = req.body.text;
        newPost.user = req.id;


        User.findById(req.id)
            .then(user => {
                newPost.name = user.name;
                newPost.avatar = user.avatar;
            })
        setTimeout(() => {
            new Post(newPost).save().then(post => res.json(post));
        }, 500)
    }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
    '/:id',
    withAuth,
    (req, res) => {
        Profile.findOne({
            user: req.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.id) {
                        return res
                            .status(401)
                            .json({
                                notauthorized: 'User not authorized'
                            });
                    }

                    // Delete
                    post.remove().then(() => res.json({
                        success: true
                    }));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        });
    }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
    '/like/:id',
    withAuth,
    (req, res) => {
        Profile.findOne({
            user: req.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({
                                alreadyliked: 'User already liked this post'
                            });
                    }

                    // Add user id to likes array
                    post.likes.unshift({
                        user: req.id
                    });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        });
    }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
    '/unlike/:id',
    withAuth,
    (req, res) => {
        Profile.findOne({
            user: req.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({
                                notliked: 'You have not yet liked this post'
                            });
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.id);

                    // Splice out of array
                    post.likes.splice(removeIndex, 1);

                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }));
        });
    }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    withAuth,
    (req, res) => {
        const {
            errors,
            isValid
        } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    user: req.id,
                    name: post.name
                };


                // Add to comments array
                post.comments.unshift(newComment);

                // Save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
                postnotfound: 'No post found'
            }));
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    withAuth,
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({
                            commentnotexists: 'Comment does not exist'
                        });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
                postnotfound: 'No post found'
            }));
    }
);

module.exports = router;