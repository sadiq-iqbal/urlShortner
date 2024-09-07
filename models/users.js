const moongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const USERS = moongoose.model('users', userSchema);

module.exports = USERS