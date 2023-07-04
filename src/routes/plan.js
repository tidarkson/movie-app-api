const express = require("express")
const router = new express.Router()
const Plan = require('../models/Plan')
const auth = require('../middleware/auth')


// CREATE PLAN 

router.post("/plan", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const plan = new Plan(req.body)
        try {
            await plan.save()
            res.send(plan)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }

})

//  READ PLAN 

router.get("/plan/:id", async (req, res) => {
    const plan = await Plan.findById(req.params.id)
    try {
        res.send(plan)
    } catch (err) {
        res.send(err)
    }
})

// UPDATE PLAN 

router.patch("/plan/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const plan = await Plan.findByIdAndUpdate({ _id: req.params.id }, {
            new: true
        })
        try {
            await plan.save()
            res.send(plan)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }

})


// DELETE PLAN  

router.delete("/plan/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const plan = await Plan.findByIdAndDelete(req.params.id)
        try {
            res.send(plan)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

module.exports = Plan