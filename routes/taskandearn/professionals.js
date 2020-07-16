const express = require('express');
const router = express.Router();
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
                attributes: ['categoryId', 'categoryName'],
                include: [
                    {
                        model: SubCategory
                    }
                ]
            }
        ],

    }).then((data) => {
        // SubCategory.findAll({ where: { categoryId: data.categoryId } }).then(allData => {
        res.json({ success: true, data: data });

        // })

    }).catch(next)
});

router.post('/', async (req, res, next) => {
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
        }).then(profession => {
            let count = 0;
            SubCategory.findAll({ where: { subCategoryId: x.subCatagoriesId } }).then((subCategoryData) => {
                console.log("tyr");
                Promise.resolve(profession.setSubcategories(subCategoryData)).then(() => {
                    console.log("subCategoryData", subCategoryData)
                    res.json({ success: true, data: profession });
                    console.log('count', count);
                    count++;
                })
            }).catch((next) => {
                console.log(next)
            })
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