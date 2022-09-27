const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const moment = require('moment')

const UserModel = require('./models/user.js')
const auth = require("./auth");


app.use(cors());
app.use(express.json());


CONNECTION_URL = 'mongodb+srv://skrpawel:skrpawel@cluster0.mttpf0u.mongodb.net/usermanager?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

app.get('/admin_panel', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
});

app.post('/admin_panel', async (req, res) => {
    const user = await UserModel.findOneAndUpdate({
        email: req.body.user.email
    }, { status: 'blocked' });

    return res.json();
})

app.post('/signup', (req, res) => {

    UserModel.findOne({ email: req.body.email }).then((user) => {

        if (user) {
            return res.status(400).json({ email: "Used" })
        }

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            registration_date: req.body.registration_date,
            login_date: req.body.login_date,
            status: 'active'
        });

        newUser.save();
        return res.status(200).json({ msg: newUser });
    });
});


app.post('/login', async (req, res) => {

    const user = await UserModel.findOneAndUpdate({
        email: req.body.email,
        password: req.body.password,
        status: 'active',
    }, { login_date: moment().format('LLL') });

    if (user) {

        const token = jwt.sign(
            {
                email: user.email,
            }, "RANDOM-TOKEN",
            { expiresIn: "24h" },
            'secret')

        return res.json({ status: 'ok', token: token });
    }

    return res.json({ status: 'not ok', user: false });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

