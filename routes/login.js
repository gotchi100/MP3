const login_routes = require('express').Router();
// import controller functions for post 
const login = require('../controllers/login');

login_routes.get('/', function(req, res){
    res.render('login.hbs');
})

// check login
login_routes.post("/check", login.check)

module.exports = login_routes;