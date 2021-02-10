const routes = require('express').Router();
const post = require('./post');
const post_controller = require('../controllers/post');
const register = require('./register');
//const register_controller = require('../controllers/register');
const login = require('./login');
const search = require('./search');
const home = require('./home');
const logged_search = require('./logged_search');

// Route for Post
routes.use('/post', post);

// Route for Register
routes.use('/register',register);

// Route for Login
routes.use('/login',login);

// Route for Search
routes.use('/search',search);

// Render Home
routes.get('/', function(req, res){
    // check for user in session, if exist logged_in = true, else logged_in = false
    // res.render('index.hbs');
    res.render('index.hbs');
})

// Render Logged Home
routes.use('/home',home);

//Render logged_search
routes.use('/logged_search',logged_search);


module.exports = routes;