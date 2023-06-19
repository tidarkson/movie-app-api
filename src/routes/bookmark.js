const router = require("express").Router()
const Bookmark = require("../models/Bookmark")
const Movie = require("../models/Movie")
const auth = require("../middleware/auth")


router.post("/bookmark/:id", auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (req.user.isAdmin === false) {
        const bookmark = new Bookmark({
            props: movie,
            owner: req.user._id,
        })

        try {
            await bookmark.save()
            res.send(bookmark)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.send("You cannot perform this operation")
    }
})

// READ BOOKMARKS 

router.get("/bookmark", auth, async (req, res) => {
    const bookmark = await Bookmark.find({
        owner: req.user._id
    })
    try {
        res.send(bookmark)
    } catch (err) {
        res.send(err)
    }
})

// DELETE BOOKMARK

router.delete("bookmark/:id", auth, async (req, res) => {
    try {
        await Bookmark.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })
    } catch (err) {
        res.status(401).send(err)
    }
})

module.exports = router