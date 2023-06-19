const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },

    id: {
        type: String,
        required: true
    },
    movies : {
        type : mongoose.Schema.Types.ObjectId
    }

})

module.exports = mongoose.model("Category", CategorySchema)