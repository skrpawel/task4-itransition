const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    login_date: { type: String },
    registration_date: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true }
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;