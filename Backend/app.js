// Requests
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    
    const admin = require('./routes/admin')
    const user = require('./routes/user')
    
    const path = require('path')             
    const mongoose = require('mongoose')
    const flash = require("connect-flash")
    const session = require("express-session")


    require("./models/User")
    const User = mongoose.model("users")

    require("./models/Feedback")
    const Feedback = mongoose.model("feedbacks")

    require("./models/Client")
    const Client = mongoose.model("clients")

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,  
            },
        }))
        app.set('view engine', 'handlebars')

    // Body Parser
        app.use(express.urlencoded())
        app.use(express.json())
        

    // Mongoose
    const uri = "mongodb+srv://dbUser:SxmmM7*PWJut62q@feedback-product.3kzkwdo.mongodb.net/"
        mongoose.Promise = global.Promise;
        mongoose.connect(uri).then(() => {
            console.log("Conection sucess")
        }).catch((err) => {
            console.log("Conection error, ERRO: " + err)
        })

    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Middlewares
    // Session
        app.use(session({
            secret: "secretkey",
            resave: true,
            saveUninitialized: true,
        }))

    // Flash
        app.use(flash())   
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash("success_msg")  
            res.locals.error_msg   = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null 
            next()
        })

  // URL pattern    
      app.use('/admin', admin)
      app.use('/user', user)


// Routes
    app.get('/', (req, res) => {
        Client.findOne().then((client) => {
            res.render("index", {client: client})

        }).catch((err) => {
            req.flash("error_msg", "Internal Error in company information rescue")
            res.send(404)
        })
    })
            

    app.get('/contact', (req,res) => {
        Client.findOne().then((client) => {
            res.render("user/contact", {client: client})

        }).catch((err) => {
            req.flash("error_msg", "Internal Error in company information rescue")
            res.send(404)
        })
    })

    app.get('/about', (req,res) => {
        Client.findOne().then((client) => {
            res.render("user/about", {client: client})

        }).catch((err) => {
            req.flash("error_msg", "Internal Error in company information rescue")
            res.send(404)
        })
    })
    
        

// Local Server Connection
    const  PORT = 8080
    app.listen(PORT, () => {
        console.log("Conection in port: " + PORT)
    })
