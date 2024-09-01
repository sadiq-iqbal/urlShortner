const express = require("express");
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = 3000;
const connectDB = require('./config/mongoConnection');
const urlRouter = require('./routes/urlRouter');

//? ___________envoirment variables connections___________\\


//? ___________database connections___________\\
connectDB().then(() => {
    console.log('database connected at port ' + process.env.MONGO_URI)
})

//? ___________middlewares___________\\

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);


//? ___________server___________\\
app.listen(PORT, () => {
    console.log('server initialized')
    console.log(`Server running on port ${PORT}`);
})