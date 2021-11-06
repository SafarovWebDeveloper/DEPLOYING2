const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shop = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    sale: {
        type: Number
    },
    like: {
        type: Number,
        default: 0
    },
    dirUser: String
});
module.exports = mongoose.model('online', shop);