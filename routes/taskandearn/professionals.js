const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const { Professionals } = require('../../models');
const task_pro = require('../../models/taskandearn/task_pro');
const User = require('../../models').User
const Category = require('../../models').Category;
const Address = require('../../models').Address
const Professional = require('../../models').Professionals
const SubCategory = require('../../models/').SubCategory


router.get('/', async function (req, res, next) {
    Professional.findAll({
        include: [

            {
                model: User,
                attributes: ['userId', 'firstName']
            },
            {
                model: Address,
                attributes: ['city', 'country']
            },
            {
                model: Category,
                attributes: ['categoryId', 'categoryName']

            }

        ],

    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.post('/', async (req, res, next) => {
    console.log('working')
    console.log(req.body)
    let x = req.body
    Address.create({
        city: x.address.city, pincode: '560068', street: x.address.street,
        country: x.address.country
    }).then(address => {
        Professional.create({
            introduction: x.introduction,
            rating: x.rating, title: x.title,
            categoryId: x.categoryId,
            addressId: address.addressId, userId: x.userId
        }).then(professionalData => {
            console.log("professionalData", professionalData);
            console.log("req.body.subCategory", req.body.subCategory);
            console.log("req.body.subCategory", req.body.subCategory[0].subCategoryId);
            let count = 0;
            SubCategory.findAll({ where: { subCategoryId: req.body.subCategory[0].subCategoryId } }).then((subCategoryData) => {
                console.log("tyr");
                Promise.resolve(professionalData.setSubCategory(subCategoryData)).then(() => {
                    console.log("subCategoryData", subCategoryData)
                    res.json({ success: true, data: professionalData });
                    console.log('count', count);
                    count++;
                })
            }).catch(next)
        }).catch(next)
    })
})

module.exports = router;



// let order = 1;
// let count = 0;
// req.body.forEach((checklists, index, array) => {
//     Checklist.update({
//         order: order,
//         title: checklists.title, description: checklists.description,
//         isCompleted: checklists.isCompleted
//     }, { where: { checklistId: checklists.checklistId, userId: req.user.id } }).then((checklistData) => {
//         if (count == array.length - 1) {
//             res.json({ success: true, data: checklistData });
//         }
//         count++;
//     }).catch(next)
//     order++;
// })