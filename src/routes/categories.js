const router = require("express").Router();
const Category = require("../models/Categories");
const auth = require("../middleware/auth")

// CREATE CATEGORY 

router.post("/category", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        const category = new Category(req.body)
        try {
            await category.save()
            res.send(category)
        } catch (err) {
            res.send(err)
        }
    } else {
        res.send("You are not allowed!")
    }
})

// DELETE CATEGORY 

router.delete("/category/:id", auth, async (req, res) => {
    if (req.user.isAdmin === true) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id)
            res.send("The category has been deleted successfully!")
            if (!category) return res.send("There is no such category")
        } catch (err) {
            res.send(err)
        }
    } else {
        res.send("You are not allowed to perform this operation!")
    }
})

// GET CATEGORY  

router.get("/category/:id", auth, async (req, res) => {
    const category_query = req.query.category
    const category_type = req.query.type
    let categories;
    try {
        if (category_query) {
            categories = await Category.aggregate([
                { $match: { name: category_query, type: category_type } },
                { $sample: { $size: 10 } }
            ])
        } else {
            categories = await Category.find()
        }
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router