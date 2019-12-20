const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.age = !isEmpty(data.age) ? data.age : '';
    data.disabilty = !isEmpty(data.disabilty) ? data.disabilty : '';

    if (!Validator.isLength(data.handle, {
            min: 2,
            max: 40
        })) {
        errors.handle = 'Handle needs to between 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required';
    }

    if (Validator.isEmpty(data.age)) {
        errors.age = 'Age field is required';
    }

    if (Validator.isEmpty(data.disability)) {
        errors.disability = 'Disability field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};