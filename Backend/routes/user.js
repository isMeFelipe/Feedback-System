const express = require('express')
const router  = express.Router() // For export routes
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

require("../models/User")
const User    = mongoose.model("users")

require("../models/Feedback")
const Feedback = mongoose.model("feedbacks")




// Routes
    // User register 
        router.get("/register",(req,res) => {
            res.render("user/registerform")
        })

        router.post("/register", (req,res) => {
            User.findOne({hashcode: req.body.password}).lean().then((user)=>{
                if(user){
                    req.flash("error_msg", "Already registered user")
                    res.redirect("/user/register")
                }
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash((req.body.email + req.body.password), salt, function(err, hash) {
                        const newUser = {
                            name: req.body.name,
                            email: req.body.email,
                            hashcode: hash,
                        }
                        new User(newUser).save().then(() => {
                            req.flash("success_msg", "Successful user register")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg", "Failure in user register")
                            res.redirect("/")
                        })
                    });
                });                

            })
        })

    // User login
        router.get('/login', (req, res) => {
            res.render('user/loginform')
        });

        router.post('/login/auth', (req,res) => {
                    User.findOne({email: req.body.email}).lean().then((user) => {
                        if(!user){
                            req.flash("error_msg", "Unregistered user")
                            res.redirect("/user/login")
                        }else{
                        // Load hash from your password DB.
                        bcrypt.compare((req.body.email + req.body.password), user.hashcode).then((result) => {
                            if(result){
                                req.flash("successful login")
                                const encodedHashcode = encodeURIComponent(user.hashcode);
                                res.redirect("/user/feedbackpage/"+encodedHashcode)
                            }else{
                                req.flash("error_msg", "Invalid password or e-mail")
                                req.redirect("/user/login")
                            }
                        });
                        }   
                    }).catch((err) => {
                        req.flash("error_msg", "Internal error in user authentication")
                        res.redirect("/")
                    })
                    



                });
     
     

    router.get('/feedbackpage/:hashcode', (req,res) => {
        User.findOne({hashcode: req.params.hashcode}).then((user) => {
            res.render('user/formpage', {user: user})

        }).catch((err) =>{ 
            req.flash("error_msg", "Unregistered user")
            res.redirect("/")
        })

    })

    router.post('/feedback/sended', (req,res) => {
            Feedback.findOne({email: req.body.email}).lean().then((exist) => {
                if(exist){
                    req.flash("error_msg", "Feedback already sent by this email")
                    res.redirect("/")
                }else{
                // Validation 
                    const name = req.body.name
                    const number = req.body.number
                    const email = req.body.email
                    const text = req.body.text
                    const avaliation = req.body.avaliation
                
                    const newfeedback = {
                        name: name,
                        number: number,
                        email: email,
                        text: text,
                        avaliation: avaliation,
                    }
                    
                    new Feedback(newfeedback).save().then(() =>{
                        req.flash("success_msg","Thanks for your feedback")
                        res.redirect("/")
                    }).catch((err) => {
                        req.flash("error_msg", "Failure in feedback save")
                        console.log(err)
                        res.redirect("/")
                    })
                }

            }).catch((err) => {
                req.flash("error_msg", "Internal error in feedback send")
                res.redirect("/")
            })






            

 
    })


    router.get('/page/aaabbb', (req,res) => {
        // aaabbb ==>  testing hascode
        res.render('admin/page')
    })


module.exports = router