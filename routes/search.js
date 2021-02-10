const search_routes = require('express').Router();
// import controller functions for searcj 
const search = require('../controllers/search');

// check search
search_routes.post("/search_post",search.check)


// not logged in
search_routes.get('/', function(req, res){
    res.render('search.hbs');
})

module.exports = search_routes;