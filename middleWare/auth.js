const { getUser } = require('../utils/service');

const loggedInUserOnly = (req, res, next) => {
    console.log('Logged-in user middleware triggered.');

    // Check if sessionId cookie exists
    const sessionId = req.cookies.sessionId;
    // res.redirect('/url/login');
    // console.log('the session id is', sessionId);

    if (!sessionId) {
        console.log('No sessionId cookie found. Redirecting to login page.');
        return res.redirect('/login');
        // next()
    }

    // // // Retrieve user from session management service
    const user = getUser(sessionId);
    if (!user) {
        console.log('Invalid session or user not found. Redirecting to login page.');
        return res.redirect('/login');
        // next()
    }

    // // // Set the user to the request object for access in route handlers
    req.user = user;
    console.log("Logged-in user:", req.user);

    // // Proceed to the next middleware or route handler
    next();
};

module.exports = { loggedInUserOnly };