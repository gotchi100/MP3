const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String, 
        required: true
    },
    date_posted: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Comment', CommentSchema);