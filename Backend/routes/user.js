const express = require('express')
const router  = express.Router() // For export routes
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

require("../models/User")
const User    = mongoose.model("users")

require("../models/Feedback")
const Feedback = mongoose.model("feedbacks")

require("../models/Client")
const Client = mongoose.model("clients")


// Routes
    // User register 
        router.get("/register",(req,res) => {
            Client.findOne().then((client) => {
                res.render("user/registerform", {client: client})
        
    
            }).catch((err) => {
                req.flash("error_msg", "Internal Error in company information rescue")
                res.send(404)
            })
           
        })

        router.post("/register", (req,res) => {
            User.findOne({email: req.body.email}).lean().then((user)=>{
                if(user){
                    req.flash("error_msg", "Already registered user")
                    res.redirect("/user/register")
                }else{
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
                }
            })
        })

    // User login
        router.get('/login', (req, res) => {
        Client.findOne().then((client) => {
            res.render("user/loginform", {client: client})

        }).catch((err) => {
            req.flash("error_msg", "Internal Error in company information rescue")
            res.redirect("/")
        })
        });

        router.post('/login/auth', (req,res) => {
            Client.findOne().then((client) => {
                    User.findOne({email: req.body.email}).lean().then((user) => {
                       
                        if(!user){
              
                            req.flash("error_msg", "Unregistered user")
                            res.redirect("/user/login")
                        }else{

                        bcrypt.compare((req.body.email + req.body.password), user.hashcode).then((result) => {
                            if(result){
                                Feedback.findOne({email: req.body.email}).lean().then((feedback) => {
                                    if(feedback){
                                        if (client.resend) {
                                            const diff = Math.abs(feedback.date.getTime() - Date.now());
                                            const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                                            const remainingDays = Math.ceil((client.response_range * 1000 * 60 * 60 * 24 - diff) / (1000 * 60 * 60 * 24));
                                
                                            if (diffInDays < client.response_range * 1000 * 60 * 60 * 24) {
                                                req.flash("error_msg", `You will only be able to resend a feedback in ${remainingDays} day(s)`);
                                                res.redirect("/");

                                            } else {
                                                req.flash("success_msg", "Successful login");
                                                const encodedHashcode = encodeURIComponent(user.hashcode);
                                                res.redirect("/user/feedbackpage/" + encodedHashcode);
                                            }
                                        } else {
                                            req.flash("error_msg", "Feedback already sent by this email");
                                            res.redirect("/");
                                        }
                                    } 
                                    else {
                                        req.flash("success_msg", "Successful login");
                                        const encodedHashcode = encodeURIComponent(user.hashcode);
                                        res.redirect("/user/feedbackpage/" + encodedHashcode);
                                    }
                                    
                                }).catch((err) => {
                                    req.flash("error_msg", "Internal Error in company information rescue " + err)
                                    res.redirect("/")
                                    })
                                

                            }else{
                                req.flash("error_msg", "Invalid password or e-mail")
                                res.redirect("/user/login")
                            }
                        });
                        }   
                    }).catch((err) => {
                        req.flash("error_msg", "Internal error in user authentication")
                        res.redirect("/")
                    })
            }).catch((err) => {
                    req.flash("error_msg", "Internal Error in company information rescue")
                    res.send(404)
                    })
        });
     
     

    router.get('/feedbackpage/:hashcode', (req,res) => {
        Client.findOne().then((client) => {
            User.findOne({hashcode: req.params.hashcode}).then((user) => {
                res.render('user/formpage', {user: user, client: client})
    
            }).catch((err) =>{ 
                req.flash("error_msg", "Unregistered user")
                res.redirect("/")
            })
    

        }).catch((err) => {
            req.flash("error_msg", "Internal Error in company information rescue")
            res.send(404)
        })
        
    })

    router.post('/feedback/sended', (req,res) => {
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
                })


module.exports = router