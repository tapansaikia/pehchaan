const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SchemesSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    linktitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Schemes = mongoose.model('schemes', SchemesSchema);