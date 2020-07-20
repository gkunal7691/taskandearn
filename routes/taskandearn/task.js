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


router.get('/appliedtask/:proId', async function (req, res, next) {
    console.log('working get')
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
                        model: User
                    }
                ],
            }
        ],
        where: { proId: req.params.proId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch((next) => {
        console.log(next)
    })
});













router.get('/task/:categoryId/:text', async function (req, res, next) {
    console.log(req.params)
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

router.post('/', async function (req, res, next) {
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



// not working properly
router.get('/allpros/:id', async function (req, res, next) {
    // console.log('working get1')
    Task.findOne({
        include: [
            {
                model: Professionals,
                // include: [{
                //     model: User 
                // }]
            }
        ],
        where: { taskId: req.params.id }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch((next) => {
        console.log(next)
    })
});
/////


router.post('/apply', async function (req, res, next) {

    Task_Pro.create({
        price: req.body.price,
        type: 'apply',
        taskId: req.body.taskId,
        proId: req.body.proId
    }).then(data => {
        res.json({ success: true, data: data });

    }).catch((next) => {
        console.log(next)
    })

})


module.exports = router; 
