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

module.export = mongoose.model("Plan", PlanSchema)