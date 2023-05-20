const mongoose = require("mongoose")

const DevicesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }

})

module.export = mongoose.model("Devices", DevicesSchema)