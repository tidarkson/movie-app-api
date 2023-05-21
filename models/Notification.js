const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },

    title: {
        type: String,
    },

    data: {
        type: String,
    },

})

module.exports = mongoose.model("Notification", NotificationSchema)