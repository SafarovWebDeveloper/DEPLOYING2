const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    emailUp: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    }
});

module.exports = mongoose.model("user", users);