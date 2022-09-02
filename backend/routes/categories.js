const express = require("express");
const router = express.Router();
const {getCategories,getSingleCategory} = require('../controllers/categories.controller')

router.get('/api/categories', async(req,res) => {
    try {
        const categories = await getCategories();
        res.status(200).send(categories)
    } catch(e) {
        res.status(500).send(e)
    }
})
router.get('/api/categories/:id', async(req,res) => {
    try {
        const blogs = await getSingleCategory(req.params.id);
        res.status(200).send(blogs)
    } catch(e) {
        res.status(500).send(e)
    }
})
module.exports = router;