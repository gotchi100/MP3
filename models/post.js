const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require("./comment").schema

const PostSchema = new mongoose.Schema({
    title_posted: {
        type: String,
        required: true
    },
    post: {
        type: String, 
        required: true
    },
    date_posted: {
        type: Date,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    // Embedd the comment schema into our Post Schema
    comments: [Comment]
    
});

module.exports = mongoose.model('Post', PostSchema);
