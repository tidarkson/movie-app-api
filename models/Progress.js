const mongoose = require("mongoose")

const ProgressSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    
    time: {
        type: String,
    },

    userId: {
        type: String,
        required: true
    },

    Status: {
        type: String
    }

})

module.export = mongoose.model("Progress", ProgressSchema)