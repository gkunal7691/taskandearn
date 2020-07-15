const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const { User } = require('../../models');
const Task = require('../../models').Task;
const Address = require('../../models/').Address
const SubCategory = require('../../models/').SubCategory

router.post('/', async (req, res, next) => {
    console.log(req.body)
    let x = req.body;
    Address.create({
        city: x.address.city, pincode: '560068', street: x.address.street,
        country: x.address.country
    }).then(data1 => {
        Task.create({
            title: x.task.title,
            description: x.task.description,
            price: x.task.price,
            categoryId: x.categoryId,
            addressId: data1.addressId,
            userId: x.userId
        }).then(data => {
            console.log('sxa', data)
            SubCategory.findAll({ where: { subCategoryId: x.subCategories } }).then((subCategoryData) => {
                console.log("tyr", subCategoryData);
                Promise.resolve(data.setSubCategories(subCategoryData.dataValues)).then(() => {
                    console.log("subCategoryData", subCategoryData)
                    res.json({ success: true, data: data })
                    console.log('count', count);
                    count++;
                })
            }).catch(next)
        }).catch(next)
    }).catch(next)
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




module.exports = router; 
