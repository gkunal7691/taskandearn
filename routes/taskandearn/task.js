const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Task = require('../../models').Task;
const Address = require('../../models/').Address

router.post('/', async (req, res, next) => {
    Task.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }).then(data => {
        res.json({ success: true, data: data })
    }).catch(next)
})

router.get('/', async function (req, res, next) {
    Task.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

// router.get('/', async function (req, res, next) {
//     SubCategory.findAll({
//         include: [
//             {
//                 model: Address
//             }
//         ],
//         where: { categoryId: req.params.categoryId },
//     }).then((data) => {
//         res.json({ success: true, data: data });
//     }).catch(next)
// });




module.exports = router; 
