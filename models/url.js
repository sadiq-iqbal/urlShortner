const mongoose = require("mongoose");
const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: {
        type: [{ timestamp: String }]
    }
}, { timestamps: true });


const URL = mongoose.model("urls", urlSchema);
module.exports = URL;