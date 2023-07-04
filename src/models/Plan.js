const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    duration: {
        type: String
    },

    devices: {
        type: Array,
        required: true,
        ref: 'Devices'
    }
})

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan