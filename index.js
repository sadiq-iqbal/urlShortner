const express = require("express");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/mongoConnection');
const urlRouter = require('./routes/urlRouter');
const { loggedInUserOnly, logs } = require("./middleWare/auth.js")
const staticRouter = require('./routes/staticRouter');
//? ___________setting views engine___________\\

app.set('view engine', 'ejs');
app.set('views', './views');

//? ___________envoirment variables connections___________\\
dotenv.config();
const PORT = process.env.PORT || 3000;


//? ___________database connections___________\\
connectDB().then(() => {
    console.log('database connected at port ' + process.env.MONGO_URI)
})

//? ___________middlewares___________\\

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(logs);
// app.use(loggedInUserOnly);
app.use("/url", express.static('public'));
// app.use('/', staticRouter)
app.use("/url", urlRouter);
// app.use("/url", express.static('public'));


//? ___________server___________\\
app.listen(PORT, () => {
    console.log('server initialized')
    console.log(`Server running on port ${PORT}`);
})