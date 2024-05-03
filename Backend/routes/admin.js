const express = require('express')
const router  = express.Router() // For export routes

// Using mongoose
const mongoose = require('mongoose')

router.get('/login', (req, res) => {
    res.render('admin/loginform')
});

router.post('/login/auth', (req,res) => {
    // Validation 
    const name = req.body.name
    const password = req.body.password

    const hascode = name + password
    // If validation it's ok
    res.redirect('/admin/page/' + hascode)
})

router.get('/page/aaabbb', (req,res) => {
    res.render('admin/page')
})


module.exports = router