const URL = require('../models/url');
const nanoid = require('nanoid')


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

    res.send({ "message ": 'short url created', "shortId": shortId })
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







module.exports = {
    handleGenerateShortUrl,
    handleRedirectToOriginalUrl,
    handleGetAnalytics,
}