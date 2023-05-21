const mongoose = require("mongoose")

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: String,
    },

    duration: {
        type: String,
    }

})

module.exports = mongoose.model("Plan", PlanSchema)