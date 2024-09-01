const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async () => {
    try {
        return await mongoose.connect(process.env.MONGO_URI);
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = connectDB