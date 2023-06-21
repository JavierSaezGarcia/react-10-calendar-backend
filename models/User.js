const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
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
    },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//    }
});

module.exports = model('User', UserSchema);