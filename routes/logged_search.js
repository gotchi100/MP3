const logged_search_routes = require('express').Router();
// import controller functions for searcj 
const search = require('../controllers/search');


// logged check search
logged_search_routes.post('/logged_search_post',search.logged_check)


// logged in
logged_search_routes.get('/', function(req, res){
    res.render('logged_search.hbs');
})


module.exports = logged_search_routes;