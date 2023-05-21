const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },

    parentId: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("Category", CategorySchema)