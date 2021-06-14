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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Files = require('../../models').Files;


router.get('/:id?', async function (req, res, next) {
    const query = {};
    if (req.query && req.query.email) {
        query.where = query.where || {};
        query.where.email = req.query.email;
    }
    Professional.findAndCountAll(query).then((users) => {
        if (users.count == 0) {
            return res.json({ emailTaken: false });
        }
        return res.json({ emailTaken: true });
    }).catch(next)
});

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


router.get('/subCat/:userId', async function (req, res, next) {
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



router.post('/', upload.any(), async (req, res, next) => {
    let professionalData = JSON.parse(req.body.professionalData);
    Address.create({
        city: professionalData.city, pincode: professionalData.pincode, street: professionalData.street,
        country: req.body.country
    }).then(address => {
        Professional.create({
            firstName: professionalData.firstName,
            lastName: professionalData.lastName,
            email: professionalData.email,
            password: User.generateHash(professionalData.password),
            description: professionalData.description,
            mobile: professionalData.mobile,
            service: professionalData.service,
            skills: professionalData.skills,
            categoryId: professionalData.categoryId,
            addressId: address.addressId,
            experience: professionalData.experience,
            hobbies: professionalData.hobbies
        }).then(professionalData => {
            let fileIds = [];
            req.files.forEach((file, index, fileArray) => {
                utils.uploadFile(file, 'taskandearn-private', 'private', function (fileId) {
                    if (fileId) {
                        fileIds.push(fileId);
                        if (index === fileArray.length - 1) {
                            if (backOfficeFilesIds.length == 0) {
                                Files.findAll({ where: { fileId: fileIds } }).then((files) => {
                                    Promise.resolve(professionalData.setProfessional(files)).then(() => {
                                        res.json({ success: true, data: professionalData });
                                    })
                                }).catch(next)
                            }
                        }
                    }
                });
            });
            // User.update({ proId: professionalData.proId }, { where: { userId: x.user.userId } }).then((user) => {
            //     let count = 0;
            //     SubCategory.findAll({ where: { subCategoryId: x.subCatagoriesId } }).then((subCategoryData) => {
            //         Promise.resolve(professionalData.setSubcategories(subCategoryData)).then(() => {
            //             res.json({ success: true, data: professionalData });
            //             count++;
            //         })
            //     }).catch(next)
            // })
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
    let x = req.body.user
    User.update({ firstName: x.name, email: x.email }, { where: { userId: req.user.userId } }).then(() => {
        Professional.update({ phone: x.phone, price: x.price }, { where: { proId: req.body.proId } }).then(data => {
            res.json({ success: true, data: data });
        }).catch(next => {
            console.log(next)
        })
    }).catch(next => {
        console.log(next)

    })
})


router.put('/user/update', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    let x = req.body.user
    User.update({ firstName: x.name, email: x.email }, { where: { userId: req.user.userId } }).then((data) => {

        res.json({ success: true, data: data });
    }).catch(next => {
        console.log(next)

    })
})




module.exports = router;
