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
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

// READ DEVICE 

router.get("/device", auth, async (req, res) => {
    const device = await Device.findById(req.params.id)

    try {
        res.send(device)
    } catch (err) {
        res.send(err)
    }
})

// DELETE DEVICE 

router.delete("/device/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const device = await Device.findByIdAndDelete()

        try {
            res.send(device)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})