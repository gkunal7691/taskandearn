const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Category = require('../../models').Category;
const PopService = require('../../models').PopularService



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

router.get('/popular-service', async function (req, res, next) {
    PopService.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

module.exports = router; 