const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js"); // hashing algirithm to encrypt password 
const jwt = require("jsonwebtoken"); //access token to validate the user

// REGISTER 
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() // password encryption 
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err)
    }

})

// LOGIN 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong username or password")

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8); // password decryption 

        originalPassword !== req.body.password && res.status(401).json("Wrong username or password")

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin},
                                       process.env.SECRET_KEY, 
                                       {expiresIn:"30 minutes"})

        const {password, ...info} = user._doc // destructure user info and return response without password 
        res.status(200).json({info, accessToken})

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router