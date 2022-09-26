const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
            status: 'active'
        });

        newUser.save();
        return res.status(200).json({ msg: newUser });
    });
});


app.post('/login', async (req, res) => {

    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
    })



    if (user) {

        const token = jwt.sign(
            {
                email: user.email,
            },
            'secret')

        return res.json({ status: 'ok', token: token });
    }

    return res.json({ status: 'not ok', user: false });
});



// // login endpoint
// app.post("/login", (request, response) => {
//     // check if email exists
//     User.findOne({ email: request.body.email })

//         // if email exists
//         .then((user) => {
//             // compare the password entered and the hashed password found
//             bcrypt
//                 .compare(request.body.password, user.password)

//                 // if the passwords match
//                 .then((passwordCheck) => {

//                     // check if password matches
//                     if (!passwordCheck) {
//                         return response.status(400).send({
//                             message: "Passwords does not match",
//                             error,
//                         });
//                     }

//                     //   create JWT token
//                     const token = jwt.sign(
//                         {
//                             userId: user._id,
//                             userEmail: user.email,
//                         },
//                         "RANDOM-TOKEN",
//                         { expiresIn: "24h" }
//                     );

//                     //   return success response
//                     response.status(200).send({
//                         message: "Login Successful",
//                         email: user.email,
//                         token,
//                     });
//                 })
//                 // catch error if password does not match
//                 .catch((error) => {
//                     response.status(400).send({
//                         message: "Passwords does not match",
//                         error,
//                     });
//                 });
//         })
//         // catch error if email does not exist
//         .catch((e) => {
//             response.status(404).send({
//                 message: "Email not found",
//                 e,
//             });
//         });
// });

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

