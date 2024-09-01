const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/mongoConnection');
const urlRouter = require('./routes/urlRouter');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);



app.listen(PORT, () => {
    console.log('server initialized')
    console.log(`Server running on port ${PORT}`);
})