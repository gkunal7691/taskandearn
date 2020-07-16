const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const User = require('../../models').User;
const Task = require('../../models').Task;
const Address = require('../../models/').Address
const SubCategory = require('../../models/').SubCategory
const Category = require('../../models/').Category

router.post('/', async function (req, res, next) {
    let x = req.body;
    Address.create({
        city: x.address.city, pincode: '560068', street: x.address.street,
        country: x.address.country
    }).then(address => {
        Task.create({
            title: x.title,
            description: x.description,
            price: x.price,
            categoryId: x.categoryId,
            addressId: address.addressId,
            userId: x.userId
        }).then(task => {
            SubCategory.findAll({ where: { subCategoryId: x.subCatagoriesId } }).then((subCategory) => {
                Promise.resolve(task.setSubcategories(subCategory)).then(() => {
                    res.json({ success: true, data: task })
                })
            }).catch(next);
        }).catch(next);
    }).catch(next);
})

// router.get('/', async function (req, res, next) {
//     Task.findAll().then((data) => {
//         res.json({ success: true, data: data });
//     }).catch(next)
// });

router.get('/', async function (req, res, next) {
    Task.findAll({
        include: [
            {
                model: Address,
            },
            {
                model: User,
                attributes: ['userId', 'firstName', 'lastName']
            }
        ],
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});


router.get('/:taskId', async function (req, res, next) {
    Task.findAll({
        include: [
            {
                model: Address,
            },
            {
                model: User,
                attributes: ['userId', 'firstName', 'lastName']
            },
            {
                model: Category,
                attributes: ['categoryId', 'CategoryName'],
                include: [{
                    model: SubCategory,
                    attributes: ['subCategoryId', 'subcategoryName']
                }]
            }
        ],
        where: { taskId: req.params.taskId }

    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});


router.get('/mytasks/:userId', async function (req, res, next) {
    console.log('working get')
    Task.findAll({
        include: [
            {
                model: Address,
            },
            {
                model: User,
                attributes: ['userId', 'firstName', 'lastName']
            }
        ],
        where: { userId: req.params.userId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});




module.exports = router; 
