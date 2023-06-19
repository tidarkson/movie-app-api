const router = require("express").Router();
const Category = require("../models/Categories");
const verify = require("../verifyToken")

// CREATE CATEGORY 

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newCategory = new Category(req.body)
        try {
            const savedCategory = await newCategory.save()
            res.status(201).json(savedCategory)

            let category = await Category.findOne({ name: req.body.name })
            if (category) return res.status(400).json("This category already exists")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

// DELETE CATEGORY 

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id)
            res.status(200).json("The category has been deleted successfully!")
            if (!category) return res.status(403).json("There is no such category")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to perform this operation!")
    }
})

// GET CATEGORY  

router.get("/:id", verify, async (req, res) => {
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