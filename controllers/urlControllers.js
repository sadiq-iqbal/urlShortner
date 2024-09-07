const URL = require('../models/url');
const nanoid = require('nanoid')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const USERS = require("../models/users");
const { handlebycrypt } = require('../utils/utils');
const { setUser, getUser } = require('../utils/service');

const handleGenerateShortUrl = async (req, res) => {
    console.log('hello from handle generate short url')
    const shortId = nanoid(8)
    console.log(shortId)
    if (!req.body.url) res.status(400).send({ message: 'url is required' })
    const urlDocument = await URL.create({
        longUrl: req.body.url,
        shortId: shortId,
        visitHistory: []
    })

    res.redirect('/url')
}
const handleRedirectToOriginalUrl = async (req, res) => {
    const shortUrl = req.params.id;
    console.log(shortUrl)
    try {
        // Find the URL by its short ID and push the new visit timestamp to visitHistory
        const urlDocument = await URL.findOneAndUpdate(
            { shortId: shortUrl },
            { $push: { visitHistory: { timestamp: new Date().toISOString() } } }, // Correctly pushes the current timestamp
            { new: true } // Return the updated document
        );

        if (urlDocument) {
            // Redirect to the original long URL
            res.redirect(urlDocument.longUrl);
        } else {
            res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.error("Error handling redirect:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const handleGetAnalytics = async (req, res) => {
    const id = req.params.id;

    try {
        const urlDocument = await URL.findOne({ shortId: id });

        if (urlDocument) {
            // Send both the length and the visit history in the response
            return res.status(200).json({
                visitCount: urlDocument.visitHistory.length, // Number of visits
                visitHistory: urlDocument.visitHistory       // Full visit history array
            });
        } else {
            res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.error("Error retrieving analytics:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const renderUrlPage = async (req, res) => {
    // console.log('hello from render url page')   
    const urls = await URL.find({})
    res.render('home.ejs', {
        urls: urls
    })
}

const renderLoginPage = async (req, res) => {
    res.render('login.ejs')
    // console.log('hello from render login page')
}


const renderSignupPage = async (req, res) => {
    res.render('signup.ejs')
}

const handleSignup = async (req, res) => {
    const data = req.body
    console.log(data)
    const { username, email, password } = data;

    if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required" })
    }

    const hashedPassword = await handlebycrypt(password)

    if (hashedPassword) {
        try {
            const userDocument = await USERS.create({
                userName: username,
                email: email,
                password: hashedPassword
            })
            res.redirect('/url/login')
        }
        catch {
            res.status(500).send({ message: "Internal Server Error" })
        }

    }
}



const handleLoginControl = async (req, res) => {
    const data = req.body
    const { email, password } = data

    if (!email || !password) {
        return res.status(400).send({ message: "All fields are required" })
    }

    try {
        const userDocument = await USERS.findOne({ email: email })
        if (!userDocument) {
            return res.status(401).send({ message: "Invalid email or password" })
        }
        const isPasswordMatch = await bcrypt.compare(password, userDocument.password)
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Invalid email or password" })
        }
        const sessionId = uuidv4();
        setUser(sessionId, userDocument);
        console.log(sessionId);
        res.cookie('sessionId', sessionId);

        res.redirect('/url')
    }
    catch {
        res.status(500).send({ message: "Internal Server Error" })
    }
}

module.exports = {
    handleSignup,
    renderSignupPage,
    renderUrlPage,
    handleGenerateShortUrl,
    handleRedirectToOriginalUrl,
    handleGetAnalytics,
    renderLoginPage,
    handleLoginControl
}
