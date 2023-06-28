const express = require('express'); 
const Device = require('../models/Device')
const auth = require("../middleware/auth");

const router = new express.Router()

// CREATE DEVICE 

router.post("/device", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const device = new Device(req.body)

        try {
            await device.save()
            res.send(device)
        } catch(err){
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})