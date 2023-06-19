const express = require('express');
const Movie = require('../models/Movie')
const auth = require("../middleware/auth")

const router = new express.Router()


// CREATE MOVIE

router.post('/movie', auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const movie = new Movie({
            ...req.body,
            author: req.user.name
        })
        try {
            await movie.save()
            res.send(movie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})


// GET MOVIE 

router.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    try {
        res.send(movie)
    } catch (err) {
        res.send(err)
    }
})

// GET MOVIE BY TYPE

router.get("/movie/type", async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "trailer") {
            movie = await Movie.aggregate([
                { $match: { isTrailer: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isTrailer: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE MOVIE 

router.patch("/movie/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        try {
            res.send(movie)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }


})


// DELETE MOVIE 

router.delete("/movie/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id)
            res.send(movie)
        } catch (err) {
            res.status(401).send(err)
        }
    } else {
        res.status(403).json("You are not allowed!")

    }
})



// GET ALL MOVIES

// router.get("/", verify, async (req, res) => {
//     if (req.user.isAdmin) {
//         try {
//           const movies = await Movie.find()
//             res.status(200).json(movies)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(403).json("You are not allowed to perform this operation!")
//     }
// })

module.exports = router