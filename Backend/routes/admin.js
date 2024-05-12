const express = require('express')
const router  = express.Router() // For export routes
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;


require("../models/User")
const User = mongoose.model("users")

router.get('/login', (req, res) => {
    res.render('admin/loginform')
});

router.post('/login/auth', (req,res) => {
    User.findOne({email: req.body.email}).lean().then((user) => {
        if(!user){
            req.flash("error_msg", "Unregistered admin")
            res.redirect("/admin/login")
        }else{
        bcrypt.compare((req.body.email + req.body.password), user.hashcode).then((result) => {
            if(result && user.isadmin == 1){
                req.flash("successful login")
                const encodedHashcode = encodeURIComponent(user.hashcode);
                res.redirect("/admin/initialpage/"+encodedHashcode)
            }else{
                req.flash("error_msg", "Invalid password or e-mail")
                res.redirect("/user/login")
            }
        });
        }   
    }).catch((err) => {
        req.flash("error_msg", "Internal error in admin authentication")
        res.redirect("/")
    })
    // res.redirect('/admin/page/' + hascode)
})

router.get('/page/:hashcode', (req,res) => {
    res.render('admin/page', {hashcode: req.params.hashcode})
})


module.exports = router