const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const gravatar = require('gravatar');

const secret = 'mysecretsshhh';

//load User model
const User = require('../../models/User');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
    });

    const {
        email,
        password,
        name
    } = req.body;
    const user = new User({
        email,
        password,
        avatar,
        name
    });
    user.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering new user please try again.");
        } else {
            res.status(200).send("Welcome to the club!");
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            errors.email = 'Email not found'
            return res.status(400)
                .json(errors);
        } else {
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    errors.password = 'Password incorrect'
                    return res.status(400)
                        .json(errors);
                } else {
                    // Issue token
                    console.log(user);
                    const id = user._id;
                    const payload = {
                        email: email,
                        id: id
                    };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    var obj = {
                        token
                    }
                    res.status(200).json(obj);
                }
            });
        }
    });
});

module.exports = router;