const mongoose = require("mongoose")

const RatingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },

    movieId: {
        type: String,
        required: true,
        unique: true
    },

    comment: {
        type: String,
    }

})

module.export = mongoose.model("Ratings", RatingsSchema)