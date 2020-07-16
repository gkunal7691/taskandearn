const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const User  = require('../../models').User;
const Task = require('../../models').Task;
const Address = require('../../models/').Address
const SubCategory = require('../../models/').SubCategory

router.post('/', async function (req, res, next){
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
            }).catch((next)=>{
                console.log(next)
            });
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




module.exports = router; 
