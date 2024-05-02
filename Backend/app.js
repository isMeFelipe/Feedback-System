const express = require("express")
const app = express()


app.get('/', (req,res) => {
    res.send("Test")
})



const  PORT = 8080
app.listen(PORT, () => {
    console.log("Conection in port: " + PORT)
})