const { getUser } = require('../utils/service')
const loggedInUserOnly = (req, res, next) => {
    console.log('the logged in only user middleWare')
    console.log(req.cookies.sessionId)
    const user = getUser(req.cookies.sessionId)
    console.log(user)
    if (!req.cookies.sessionId) {
        return res.redirect('/url/login')
    }
    // if (!user) {
    //     return res.redirect('/url/login')
    // }
    req.user = user
    console.log("the loged in user is", req.user)
    next()

}
const logs = (req, res, next) => {
    console.log(req.url, req.method); console.log(req.body);
    next();
}
module.exports = { loggedInUserOnly, logs }