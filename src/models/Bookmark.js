const mongoose = require("mongoose")

const BookmarkSchema = new mongoose.Schema({
    props: {
        type: mongoose.Schema.Types.Array,
        required: true,
    }, 
    
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },

})

module.exports = mongoose.model("Bookmark", BookmarkSchema)