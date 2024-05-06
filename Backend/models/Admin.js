const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: {
        type: String,
        require: true,
    },
    hashcode: {
        type: String,
        require: true,
    },

})

mongoose.model("admins", Admin);