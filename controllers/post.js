const mongoose = require('mongoose');
const Post = require("../models/post")
const Comment = require("../models/comment")
const fs = require('fs');

// export a function called create which allows us to create new posts
exports.create = function (req, res) {
    console.log(req.body)
    const newPost = new Post({
        title_posted: req.body.title_posted,
        post: req.body.post,
        date_posted: new Date(),
    });

    // newPost.img.data = fs.readFileSync(req.file.path)
    // newPost.img.contentType = 'image/jpeg';

    newPost.save(function (err, newPost) {
        if (err) throw err;
        console.log(newPost);
        console.log("Successfully Created Article")
        res.redirect("/post/logged_find_all")
    })
}


// function that adds a new comment to a post 
exports.create_comment = function (req, res) {
    newComment = new Comment({comment: req.body.comment})
    Post.updateOne({ _id: req.body["post-id"] },
        // push here is an operator that will add a new Comment into our Post Object 
        { $push: { comments: newComment } },
        function (err, post) {
            if (err) throw err;
            console.log("Added comment")
            console.log(post)
            // we are sending back the post id so that we can use this information for the delete functionality
            res.send({comment: newComment,
                      post_id: req.body["post-id"]})
        })
}

// export a function called find_all which returns all posts in the database 
exports.find_all = function (req, res) {
    // we are using the lean function here so that mongoose will return js objects instead of mongoose documents 
    Post.find({}).lean().exec(function (err, posts) {
        console.log(posts)
        res.render("post.hbs", { posts: posts })
    })
}

// delete a single post based on a criteria provided through the request object
exports.delete_post = function (req, res) {
    Post.deleteOne({ _id: req.body.post_id }, function (err, response) {
        if (err) throw err;
        console.log(response);
        console.log("Post deleted")
        res.redirect('/post/logged_find_all')
    })
}

// function that deletes a comment to a post 
exports.delete_comment = function (req, res) {
    Post.updateOne({ _id: req.body["post_id"] },
        // pull is an operator that removes a comment in our list based on a criteria 
        { $pull: { comments: {_id: req.body.comment_id} } },
        function (err, post) {
            if (err) throw err;
            console.log("Removed comment")
            res.send(200)

        })
}

// updates a single post based on a criteria 
exports.update_post = function (req, res) {
    Post.updateOne(req.body.filter, req.body.post, function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log("Post updated")
    })
}

// export a function called find_all which returns all posts in the database 
exports.logged_find_all = function (req, res) {
    // we are using the lean function here so that mongoose will return js objects instead of mongoose documents 
    Post.find({}).lean().exec(function (err, posts) {
        console.log(posts)
        res.render("logged_post.hbs", { posts: posts })
    })
}
