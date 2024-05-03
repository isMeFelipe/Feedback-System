const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Feedback = new Schema({
    name: {
        type: String,
        require: true,
    },
    number: {
        type: Number,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    Avaliation: {
        type: String,
        require: true,
    },
    email: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },

})

mongoose.model("feedbacks", Feedback);