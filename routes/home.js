const home_routes = require('express').Router();

home_routes.get('/', function(req, res){
    res.render('login_index.hbs');
})

module.exports = home_routes;