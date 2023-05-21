const mongoose = require("mongoose")

const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    planId: {
        type: String,
    },

    expiresAt: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Subscription", SubscriptionSchema)