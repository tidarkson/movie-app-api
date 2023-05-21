const mongoose = require("mongoose")

const TranscriptSchema = new mongoose.Schema({
    LanguageId: {
        type: String,
        unique: true
    },

    filePath: {
        type: String,
    },

    movieId: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model("Transcript", TranscriptSchema)