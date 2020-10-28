const mongoose = require("mongoose");


const categoryScheme = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
    },
    {timestamps: true},
    { collection: 'categories' }
)



module.exports = mongoose.model("Category", categoryScheme)