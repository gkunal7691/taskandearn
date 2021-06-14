const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Professionals = require('../../models').Professionals
const User = require('../../models').User;
const Task = require('../../models').Task;
const Address = require('../../models/').Address
const SubCategory = require('../../models/').SubCategory
const Category = require('../../models/').Category
const Task_Pro = require('../../models').Task_Pro
var passport = require('passport');


router.get('/appliedtask', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    // User.findAll({
    Professionals.findOne({
        include: [

            {
                model: Task,
                include: [
                    {
                        model: Address,
                    },
                    {
                        model: User,
                        attributes: ['userId', 'firstName', 'lastName', 'email']
                    },
                    {
                        model: Professionals
                    }
                ],
            }
        ],
        where: { proId: req.user.professionalId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch((next) => {
        console.log(next)
    })
});

router.get('/requestedTasks', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    // User.findAll({
    Professionals.findAll({
        include: [

            {
                model: Task,
                include: [
                    {
                        model: Address,
                    },
                    {
                        model: User,
                        attributes: ['userId', 'firstName', 'lastName', 'email']
                    },
                    {
                        model: Professionals
                    }
                ],
                // where: { type: 'request' },
            }
        ],
        where: { proId: req.user.professionalId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch((next) => {
        console.log(next)
    })
});


// router.get('/requestedTasks/:proId', async function (req, res, next) {
//     console.log(' req is working get')
//     // User.findAll({
//     Task_Pro.findAll({
//         include: [
//             {
//                 model: Task
//             }
// {
//     model: Task,
//     include: [
//         {
//             model: Address,
//         },
//         {
//             model: User,
//             attributes: ['userId', 'firstName', 'lastName', 'email']
//         }
//     ],
//     where: { type: 'request' },
// }
//         ],
//         where: { proId: req.params.proId }
//     }).then((data) => {
//         res.json({ success: true, data: data });
//     }).catch((next) => {
//         console.log(next)
//     })
// });










router.post('/proSubCat', async function (req, res, next) {
    let x = req.body;
    Address.create({
        city: x.address.city, pincode: x.address.pincode, street: x.address.street,
        country: x.address.country
    }).then(address => {
        Task.create({
            title: x.title,
            description: x.description,
            price: x.price,
            categoryId: x.categoryId,
            addressId: address.addressId,
            userId: x.user.userId
        }).then(task => {
            Task_Pro.create({ price: x.price, type: 'Request', taskId: task.taskId, proId: x.proId }).then((task_Pro) => {
                res.json({ success: true, data: task_Pro })
            })
        }).catch(next);
    }).catch(next);
})


router.post('/applyTask', async function (req, res, next) {
    Task_Pro.create({ price: req.body.price, type: 'apply', taskId: req.body.taskId, proId: req.body.proId }).then((task_Pro) => {
        res.json({ success: true, data: task_Pro })
    })
})

router.get('/task/:categoryId/:text', async function (req, res, next) {
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
        where: {
            categoryId: req.params.categoryId,
            $or: [
                {
                    title: {
                        $like: '%' + req.params.text + '%'
                    },
                },
                {
                    description: {
                        $like: '%' + req.params.text + '%'
                    },
                },
            ]
        }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

// router.post('/', async function (req, res, next) {
//     let x = req.body;
//     Address.create({
//         city: x.address.city, pincode: x.address.pincode, street: x.address.street,
//         country: x.address.country
//     }).then(address => {
//         Task.create({
//             title: x.title,
//             description: x.description,
//             price: x.price,
//             categoryId: x.categoryId,
//             addressId: address.addressId,
//             userId: x.user.userId
//         }).then(task => {
//             SubCategory.findAll({ where: { subCategoryId: x.subCatagoriesId } }).then((subCategory) => {
//                 Promise.resolve(task.setSubcategories(subCategory)).then(() => {
//                     res.json({ success: true, data: task })
//                 })
//             }).catch(next);
//         }).catch(next);
//     }).catch(next);
// })

router.post('/', async function (req, res, next) {
    let x = req.body;
    Address.create({
        city: x.address.city, pincode: x.address.pincode, street: x.address.street,
        country: x.address.country, contact: x.address.contact, contactStatus: x.address.contactStatus
    }).then(address => {
        Task.create({
            title: x.task.title,
            description: x.task.description,
            price: x.task.price,
            categoryId: x.categoryData.category,
            addressId: address.addressId,
            userId: x.user.userId,
            name: x.categoryData.name,
            postType: x.categoryData.type
        }).then(task => {
            res.json({ success: true, data: task })
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
            }, {
                model: Professionals,
                // where: { proId: req.params.id }
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
                attributes: ['userId', 'firstName', 'lastName', 'email']
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


router.get('/mytasks/posted', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
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
        where: { userId: req.user.userId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});


router.get('/allpros/:id', async function (req, res, next) {
    Task.findOne({
        include: [
            {
                model: Professionals,
                include: [{
                    model: User,
                    attributes: ['firstName'],
                }]
            }
        ],
        where: { taskId: req.params.id }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch((next) => {
        console.log(next)
    })
});


router.get('/allTasksOfPro/:proId', async (req, res, next) => {
    Task_Pro.findAll({
        where: {
            proId: req.params.proId,
            type: 'apply'
        }
    }).then(task => {
        res.json({ success: true, data: task });
    })
})



module.exports = router;
