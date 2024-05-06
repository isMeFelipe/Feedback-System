const express = require('express')
const router  = express.Router() // For export routes

// Using mongoose
const mongoose = require('mongoose')

router.get('/login', (req, res) => {
    res.render('user/loginform')
});

router.post('/login/auth', (req,res) => {
    // Validation 
    const name = req.body.name // test aaa
    const password = req.body.password // test bbb

    const hascode = name + password
    // If validation it's ok

    res.redirect('/user/feedback/send/' + hascode)
})


router.get('/feedback/send/aaabbb', (req,res) => {
        // aaabbb ==>  testing hascode
    res.render('user/formpage')
})

router.post('/feedback/sended', (req,res) => {
        // Validation 
        const name = req.body.name
        const number = req.body.number
        const email = req.body.email
        const text = req.body.text
        const avaliation = req.body.avaliation

        // If validation it's ok
    
        res.json({name: name, number: number, email: email, text: text, avaliation: avaliation})
})


router.get('/page/aaabbb', (req,res) => {
    // aaabbb ==>  testing hascode
    res.render('admin/page')
})


module.exports = router