// npm install express express-handlebars body-parser path mongoose connect-flash express-session bcrypt
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
    const session = require("express-session")

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
            res.locals.success_msg = req.flash("success_msg")  // Create global variables
            res.locals.error_msg   = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null // Storage authenticated user or null
            next()
        })

  // URL pattern    
      app.use('/admin', admin)
      app.use('/user', user)


// Routes
    // Testing
        app.get('/', (req, res) => {
            res.render("index")
        })
            
        

// Local Server Connection
    const  PORT = 8080
    app.listen(PORT, () => {
        console.log("Conection in port: " + PORT)
    })


// Conexão com MongoDB Atals
// Página de configurações para mudar informações da empresa ou mudar o tempo de restart de feedback
// Aplicar bootstrap
// Fazer front-end