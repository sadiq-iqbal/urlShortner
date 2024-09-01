const mongoose = require("mongoose");
const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    },
    visitHistory: {
        type: Array
    }
}, { timestamps: true });


const URL = mongoose.model("URL", urlSchema);
module.exports = URL;