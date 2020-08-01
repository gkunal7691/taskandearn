const express = require('express');
const router = express.Router();
const task_pro = require('../../models/taskandearn/task_pro');
const subCategory = require('../../models/taskandearn/subCategory');
const User = require('../../models').User
const Category = require('../../models').Category;
const Address = require('../../models').Address
const Professional = require('../../models').Professionals
const SubCategory = require('../../models/').SubCategory
const { Op } = require("sequelize");
var passport = require('passport');



// router.get('/prop/:categoryId/:text', async function (req, res, next) {
//     console.log('title serch')
//     console.log(req.params)
//     Professional.findAll({
//         where: {
//             categoryId: req.params.categoryId,
//             $or: [
//                 {
//                     title: {
//                         $like: '%' + req.params.text + '%'
//                     },
//                 },
//                 {
//                     introduction: {
//                         $like: '%' + req.params.text + '%'
//                     },
//                 },
//             ]
//         }
//     }).then((data) => {
//         res.json({ success: true, data: data });
//     }).catch(next => {
//         console.log(next)
//     })
// });


router.get('/prop/:categoryId/:text', async function (req, res, next) {

    User.findAll({
        include: [{
            model: Professional,
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
            },
            include: [
                {
                    model: Address,
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
            ]
        },
        ]
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)
    })
});








// router.get('/subCat/:proId', async function (req, res, next) {
//     Professional.findOne({ where: { proId: req.params.proId } }).then((pro) => {
//         SubCategory.findAll({ where: { categoryId: pro.categoryId } }).then((subCategories) => {
//             res.json({ success: true, data: subCategories })
//         })
//     })
// })

router.get('/subCat/:userId', async function (req, res, next) {
    console.log(req.params)
    User.findOne({
        include: [{
            model: Professional,
            include: [{
                model: SubCategory
            }]
        }],
        where: { userId: req.params.userId }
    }).then((pro) => {
        res.json({ success: true, data: pro })
    }).catch(next => {
        console.log(next)
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
            price: x.price,
            title: x.title,
            dob: x.dob,
            phone: x.phone,
            gender: x.gender,
            categoryId: x.categoryId,
            addressId: address.addressId,
        }).then(professionalData => {

            User.update({ proId: professionalData.proId }, { where: { userId: x.user.userId } }).then((user) => {
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
            })
        }).catch(next)
    })
})



router.get('/', async function (req, res, next) {
    User.findAll({
        attributes: ['userId', 'firstName', 'lastName', 'proId'],
        include: [
            {
                model: Professional,
                include: [
                    {
                        model: Address,
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
                ]
            }


        ],
        where: {
            proId: {
                [Op.ne]: null,
            }
        }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)
    })
});


router.get('/pros', async function (req, res, next) {
    User.findAll({
        limit: 8,
        attributes: ['userId', 'firstName', 'lastName', 'proId'],
        include: [
            {
                model: Professional,
                include: [
                    {
                        model: Address,
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
                order: [
                    ['createdAt', 'ASC'],
                ],
            }
        ],

        where: {
            proId: {
                [Op.ne]: null,
            }
        }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)
    })
});


router.get('/alluserdata/:id', async function (req, res, next) {
    User.findAll({
        attributes: ['userId', 'firstName', 'lastName', 'email'],
        include: [
            {
                model: Professional,
                include: [
                    {
                        model: Address,
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
                ]
            }
        ],
        where: { userId: req.params.id }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)
    })
});

router.put('/update', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    console.log(req.body)
    let x = req.body.user

    User.update({ firstName: x.name, email: x.email }, { where: { userId: req.user.userId } }).then(() => {

        Professional.update({ phone: x.phone, price: x.price }, { where: { proId: req.body.proId } }).then(data => {
            res.json({ success: true, data: data });

            // res.json({ success: true, data: user });
        }).catch(next => {
            console.log(next)
        })
    }).catch(next => {
        console.log(next)

    })
})


router.put('/user/update', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    console.log(req.body)
    let x = req.body.user

    User.update({ firstName: x.name, email: x.email }, { where: { userId: req.user.userId } }).then((data) => {

        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)

    })
})




module.exports = router;
