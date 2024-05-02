// Requests
    const express = require("express")
    const app = express()


// Config





// Routes
    app.get('/', (req,res) => {
        res.send("Test")
    })




// Local Server Connection
    const  PORT = 8080
    app.listen(PORT, () => {
        console.log("Conection in port: " + PORT)
    })