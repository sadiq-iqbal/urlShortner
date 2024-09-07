const bcrypt = require('bcrypt');
const handlebycrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    if (password) {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }
    else {
        return null
    }
}

module.exports = { handlebycrypt }