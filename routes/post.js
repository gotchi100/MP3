const post_routes = require('express').Router();
// import controller functions for post 
const post = require('../controllers/post');

post_routes.get('/create', function(req, res){
    res.render('logged_post.hbs');
})

// create a new post 
post_routes.post("/create_post", post.create)

// create a comment
post_routes.post("/create_comment", post.create_comment)

// retrieve all posts
post_routes.get("/find_all", post.find_all)

// delete a comment
post_routes.post("/delete_comment", post.delete_comment)

// delete a post
post_routes.post("/delete_post", post.delete_post)

// search a post
// post_routes.post("/search", post.search_post)

// Logged In 
post_routes.get('/logged_find_all',post.logged_find_all)

module.exports = post_routes;