const mongoose = require('mongoose');
const Post = require("../models/post")


exports.check = function (req,res) {
    Post.findOne({post: req.body.title_posted}).lean().exec(function (err, posts) {
        if (err) throw err;
        console.log(req.body.title_posted)
        console.log(posts)
        res.render("search_post.hbs", {posts:posts})
    })
}

exports.logged_check = function (req,res) {
    Post.findOne({post: req.body.title_posted}).lean().exec(function (err, posts) {
        if (err) throw err;
        console.log(req.body.title_posted)
        console.log(posts)
        res.render("logged_search_post.hbs", {posts:posts})
    })
}