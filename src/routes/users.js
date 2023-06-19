const express = require('express');
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')


// CREATE USER 
router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.accessToken()
        res.send({ user, token })
    } catch (err) {
        res.send(err)
    }
})

// CREATE ADMIN 

router.post("/users/admin", async (req, res) => {
    const {isAdmin, ...others} = req.body
    const user = new User({
        isAdmin: true,
        ...others
    }) 

    try {
        await user.save()
        const token = await user.accessToken()
        res.send({ user, token })
    } catch (err) {
        res.send(err)
    }
})

// LOGIN ENDPOINT FOR USER

router.post('/users/login', async (req, res) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.accessToken()

    try {
        res.send({ user, token })
    } catch (err) {
        res.status(400).send("Cannot find user")
    }
})

// LOGOUT ENDPOINT FOR USER

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

// LOGOUT ENDPOINT FOR MULTIPLE SESSIONS OF A USER 

router.post("/users/logout-all", auth, async(req, res)=> {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err){ 
        res.status(500).send()
    }
})

// READ USER 

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

// UPDATE USER 
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'username', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send("Invalid operation")
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (err) {
        res.send(err)
    }
})


// DELETE USER 
router.delete("/users/me", auth, async (req, res) => {
    const user = await User.findByIdAndDelete(req.user._id)

    try {
        res.status(200).send(req.user)
    } catch (err) {
        res.send(err)
    }
})



module.exports = router