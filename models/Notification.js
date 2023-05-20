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

module.export = mongoose.model("Notification", NotificationSchema)