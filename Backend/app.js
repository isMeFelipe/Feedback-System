// Requests
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    
    const admin = require('./routes/admin')

    const user = require('./routes/user')
    const path = require('path')             // module to work with directorys
    const mongoose = require('mongoose')
    const flash = require("connect-flash")

    require("./models/Admin")
    const Admin = mongoose.model("admins")

    require("./models/User")
    const User = mongoose.model("users")

    require("./models/Feedback")
    const Feedback = mongoose.model("feedbacks")

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true, // Para conseguir acessos 
                allowProtoMethodsByDefault: true,    // Para conseguir acessos
            },
        }))
        app.set('view engine', 'handlebars')


    // Body Parser
        app.use(express.urlencoded())
        app.use(express.json())
        

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/feedbacksystem").then(() => {
            console.log("Conection sucess")
        }).catch((err) => {
            console.log("Conection error, ERRO: " + err)
        })


// Middlewares
    app.use('/admin', admin)




// Routes
    // Testing
        app.get('/', (req, res) => {
            // Admin.find().then((posts) => {
            //     res.json(posts)
            // }).catch((err) => {
            //     req.flash("error_msg", "There was a problem with initial page loading")
            //     res.redirect("/404")
            // })

            // User.find().then((posts) => {
            //     res.json(posts)
            // }).catch((err) => {
            //     req.flash("error_msg", "There was a problem with initial page loading")
            //     res.redirect("/404")
            // })

            Feedback.find().then((posts) => {
                res.json(posts)
            }).catch((err) => {
                req.flash("error_msg", "There was a problem with initial page loading")
                res.redirect("/404")
            })
            
            
            
        })

    
        




// Local Server Connection
    const  PORT = 8080
    app.listen(PORT, () => {
        console.log("Conection in port: " + PORT)
    })