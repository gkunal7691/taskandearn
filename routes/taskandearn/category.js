const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Category = require('../../models').Category;



router.post('/', async (req, res, next) => {
    // console.log('working', req.body)

    Category.create({
        imagePath: req.body.imagePath,
        categoryName: req.body.categoryName,
        description: req.body.description
    }).then(data => {
        res.json({ success: true, data: data })
    }).catch(next)
})


router.get('/', async function (req, res, next) {
    Category.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

module.exports = router; 