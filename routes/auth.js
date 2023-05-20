const router = require("express").Router();
const User = require('../models/User')

router.post("/register", (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    const user = newUser.save()
})

module.exports = router