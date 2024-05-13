const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Client = new Schema({
    name: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },

    address: {
        type: String,
        require: true,
    },
    logo:{
        type: String,
        require: true,
    },
    resend:{
        type: Boolean,
        require: true,
        default: false
    },
    response_range:{
        type:  Number,
        default: 0,
    },
    

})

mongoose.model("clients", Client);