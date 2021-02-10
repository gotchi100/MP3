const mongoose = require('mongoose');
const Users = require("../models/register")


exports.check = function (req, res) {
    let username = req.body.username
    let password = req.body.password

    if(username == "" || password == ""){
        res.render("login.hbs", {
            error: "Enter username and password"
        })
    } else {
        Users.findOne({'username': username}).then((doc)=>{
            if(doc == null){
                res.render("login.hbs", {
                    error:"User does not exist"
                })
                console.log("User does not exist")
            } else {
                if (doc.password === password) { 
                    //req.session.username = username
                    res.render("login_index.hbs")
                    console.log("Login Successful")
                } 
                else { 
                    res.render("login.hbs", {
                        error: "Username and password do not match"
                    })
                    console.log("Username and password do not match")
                }
            }
        })
    }
}