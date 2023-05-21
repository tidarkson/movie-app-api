const mongoose = require("mongoose")

const DevicesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }

})

module.exports = mongoose.model("Devices", DevicesSchema)