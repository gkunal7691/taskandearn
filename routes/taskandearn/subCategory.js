const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Category = require('../../models').Category;
const SubCategory = require('../../models/').SubCategory



router.post('/', async (req, res, next) => {
    SubCategory.create({
        categoryName: req.body.categoryName,
        description: req.body.description,
        categoryId: req.body.categoryId
    }).then(data => {
        res.json({ success: true, data: data })
    }).catch(next)
})


router.get('/', async function (req, res, next) {
    SubCategory.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.get('/:categoryId', async function (req, res, next) {
    SubCategory.findAll({
        include: [
            {
                model: Category
            }
        ],
        where: { categoryId: req.params.categoryId },
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

module.exports = router; 