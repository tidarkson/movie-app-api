const mongoose = require("mongoose")

const BookmarkSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    
    userId: {
        type: String,
        required: true,
    }

})

module.export = mongoose.model("Bookmark", BookmarkSchema)