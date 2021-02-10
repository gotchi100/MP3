const register_routes = require('express').Router();

// import controller functions for post 
const register = require('../controllers/register');

// create a new post 
register_routes.post("/create_user", register.create)

// retrieve register
register_routes.get("/", function(req, res){
        res.render('register.hbs');
})

module.exports = register_routes;

