const mongoose = require('mongoose');
const Post = require("../models/register")

// export a function called create which allows us to create new posts
exports.create = function (req, res) {
    console.log(req.body)
    const newPost = new Post({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    newPost.save(function (err, newPost) {
        if (err) throw err;
        console.log(newPost);
        console.log("Successfully Registered User")
        res.redirect("/")
    })
}


// LOGIN
// Get the user from DB based on username - Register object
// Compare the password from user with the hashed one in the Register object
 
// const bcrypt = require('bcrypt');

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         const newPost = new Post({
//             email: req.body.email,
//             username: req.body.username,
//             password: hash
//         });
//     });
// });