const express = require('express');
const router = express.Router();
const task_pro = require('../../models/taskandearn/task_pro');
const subCategory = require('../../models/taskandearn/subCategory');
const User = require('../../models').User
const Category = require('../../models').Category;
const Address = require('../../models').Address
const Professional = require('../../models').Professionals
const SubCategory = require('../../models/').SubCategory

router.get('/prop/:categoryId/:text', async function (req, res, next) {
    console.log(req.params)
    Professional.findAll({
        where: {
            categoryId: req.params.categoryId,
            $or: [
                {
                    title: {
                        $like: '%' + req.params.text + '%'
                    },
                },
                {
                    introduction: {
                        $like: '%' + req.params.text + '%'
                    },
                },
            ]
        }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.get('/subCat/:proId', async function (req, res, next) {
    Professional.findOne({ where: { proId: req.params.proId } }).then((pro) => {
        SubCategory.findAll({ where: { categoryId: pro.categoryId } }).then((subCategories) => {
            res.json({ success: true, data: subCategories })
        })
    })
})


// router.get('/all', async function (req, res, next) {
//     Professional.findAll({
//         include: [
//             {
//                 model: User,
//                 attributes: ['userId', 'firstName']
//             },
//             {
//                 model: Address,
//                 attributes: ['city', 'country']
//             },
//             {
//                 model: Category,
//                 attributes: ['categoryId', 'categoryName'],
//                 include: [
//                     {
//                         model: SubCategory
//                     }
//                 ]
//             }
//         ],

//     }).then((data) => {
//         res.json({ success: true, data: data });
//     }).catch(next)
// });

router.post('/', async (req, res, next) => {
    console.log('working')
    console.log(req.body)
    let x = req.body
    Address.create({
        city: x.address.city, pincode: x.address.pincode, street: x.address.street,
        country: x.address.country
    }).then(address => {
        Professional.create({
            introduction: x.introduction,
            rating: x.rating, title: x.title,
            categoryId: x.categoryId,
            addressId: address.addressId, userId: x.userId
        }).then(professionalData => {
            let count = 0;
            SubCategory.findAll({ where: { subCategoryId: x.subCatagoriesId } }).then((subCategoryData) => {
                console.log("tyr");
                Promise.resolve(professionalData.setSubcategories(subCategoryData)).then(() => {
                    console.log("subCategoryData", subCategoryData)
                    res.json({ success: true, data: professionalData });
                    console.log('count', count);
                    count++;
                })
            }).catch(next)
        }).catch(next)
    })
})



router.get('/', async function (req, res, next) {
    User.findAll({
        include: [
            {
                model: Professional,
                // attributes: ['userId', 'firstName']
                include: [
                    {
                        model: Category,
                        attributes: ['categoryId', 'categoryName'],
                        include: [
                            {
                                model: SubCategory
                            }
                        ]
                    }
                ]
            },
            {
                model: Address,
                attributes: ['city', 'country']
            },

        ],

    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

module.exports = router;
