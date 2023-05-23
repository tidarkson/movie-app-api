const router = require("express").Router()
const Movie = require('../models/Movie')
const verify = require("../verifyToken")


// CREATE MOVIE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)
        try {
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

// UPDATE MOVIE 

router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true })

            res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to perform this operation!")
    }
})

// DELETE MOVIE 

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("The movie has been deleted successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to perform this operation!")
    }
})

// GET MOVIE 

router.get("/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }

})


// GET MOVIE BY TYPE

router.get("/random", verify, async (req, res) => {
    const type = req.query.type
    let movie
    if (req.user.isAdmin) {
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
    } else {
        res.status(403).json("You are not allowed!")
    }
})

// GET ALL MOVIES

router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
          const movies = await Movie.find()
            res.status(200).json(movies)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to perform this operation!")
    }
})

module.exports = router