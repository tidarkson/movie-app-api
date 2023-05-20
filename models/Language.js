const mongoose = require("mongoose")

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    }

})

module.export = mongoose.model("Language", LanguageSchema)