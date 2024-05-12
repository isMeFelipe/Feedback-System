const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    }, 
    hashcode: {
        type: String,
        require: true
    },
    isadmin:{
        type: Number,
        default: 0,
    },
    
})

mongoose.model("users", User);