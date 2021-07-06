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
const utils = require('../../utils/aws');
const jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../../config/config');



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


/* Login user. */
router.post('/becomeaearner/login', function (req, res, next) {
    if (!req.body.email)
        return next(new Error('missing_email'));
    if (!req.body.password)
        return next(new Error('missing_password'));

    Professional.findOne({ where: { email: req.body.email.toLowerCase() }, raw: false }).then((user) => {
        if (!user)
            return next(new Error('invalid_email'));
        if (!user.isValidPassword(req.body.password))
            return next(new Error('invalid_password'));
        let expiresIn = req.body.rememberMe ? '15d' : '1d';
        let token = jwt.sign({
            proId: user.proId,
            email: user.email.toLowerCase(),
            firstName: user.firstName,
            lastName: user.lastName,
        }, config.jwt.secret, { expiresIn: expiresIn, algorithm: config.jwt.algorithm });

        res.json({
            success: true,
            data: {
                token: token
            }
        });
        Professional.update({ lastLogin: new Date() }, { where: { userId: user.id } });
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
    }).catch(next)
});

router.get('/profile/view', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    Professional.findOne({
        include: [
            {
                model: Address,
            },
            {
                model: Files, as: 'img', attributes: ['fileId', 'downloadLink']
            },
            {
                model: Files, as: 'proofFile', attributes: ['fileId', 'fileName', 'downloadLink'],
                through: { attributes: [] }
            },

        ],
        where: { proId: req.user.proId }
    }).then((pro) => {
        res.json({ success: true, data: pro })
    }).catch(next)
})


router.post('/profileViewByAdmin', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    Professional.findOne({
        include: [
            {
                model: Address,
            },
            {
                model: Files, as: 'img', attributes: ['fileId', 'downloadLink']
            },
            {
                model: Files, as: 'proofFile', attributes: ['fileId', 'fileName', 'downloadLink'],
                through: { attributes: [] }
            }
        ],
        where: { proId: req.body.proId }
    }).then((pro) => {
        res.json({ success: true, data: pro });
    }).catch(next);
})


router.post('/', upload.any(), async (req, res, next) => {
    let professionalData = JSON.parse(req.body.professionalData);
    Address.create({
        city: professionalData.city, pincode: professionalData.pincode, street: professionalData.street,
        country: professionalData.country
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
        }).then((professionalData) => {
            let proofFileIds = [];
            let imgFileId;
            req.files.forEach((file, index, fileArray) => {
                let bucket;
                let acl;
                if (file.fieldname == 'imageFile') {
                    acl = 'public-read';
                    bucket = 'taskandearn-public';
                } else {
                    acl = 'private';
                    bucket = 'taskandearn-private';
                }
                utils.uploadFile(file, bucket, acl, function (fileId) {
                    if (fileId) {
                        if (file.fieldname == 'proofFile') {
                            proofFileIds.push(fileId);
                        }

                        if (file.fieldname == 'imageFile') {
                            imgFileId = fileId;
                        }

                        if (index === fileArray.length - 1) {
                            Files.findAll({ where: { fileId: proofFileIds } }).then((files) => {
                                Promise.resolve(professionalData.addProofFile(files)).then(() => {
                                    if (imgFileId) {
                                        Professional.update({ imgFileId: imgFileId },
                                            { where: { proId: professionalData.proId } }).then((data) => {
                                                res.json({ success: true, data: professionalData });
                                            }).catch(next)
                                    } else {
                                        res.json({ success: true, data: professionalData });
                                    }
                                })
                            }).catch(next)
                        }
                    }
                });
            });
        }).catch(next)
    })
})


router.post('/profileImg', upload.any(), async (req, res, next) => {
    utils.uploadFile(req.files[0], 'taskandearn-public', 'public-read', function (fileId) {
        if (fileId) {
            Professional.update({ imgFileId: fileId },
                { where: { proId: req.body.proId } }).then((data) => {

                    if (req.body.imgFileId) {
                        utils.deleteFile(proData.imgFileId, function (deleteFile) {
                            res.json({ success: true })
                        })
                    } else {
                        res.json({ success: true })
                    }
                }).catch(next)
        }
    });
})


router.post('/fileDownloadLink', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    let proId;
    if (req.body.proId) {
        proId = req.body.proId;
    } else {
        proId = req.user.proId;
    }
    Professional.findOne({
        where: { proId: proId },
        attributes: ['proId'], include: [
            {
                model: Files, as: 'proofFile', attributes: ['fileId', 'bucket', 'fileName'],
                through: { attributes: [] }, where: { fileId: req.body.fileId }
            },
        ]
    }).then((data) => {
        utils.getSingleSignedURL(data.proofFile[0], function (downloadLink) {
            if (downloadLink) {
                res.json({ success: true, data: downloadLink })
            }
        })
    }).catch(next);
})


router.put('/', async (req, res, next) => {
    Address.update(req.body, { where: { addressId: req.body.addressId } }).then(address => {
        Professional.update(req.body, { where: { proId: req.body.proId } }).then((professionalData) => {
            res.json({ success: true, data: professionalData });
        }).catch(next)
    })
})


router.get('/allProfessional/list', async function (req, res, next) {
    Professional.findAll({
        attributes: ['proId', 'firstName', 'lastName', 'imgFileId', 'mobile', 'isArchive'],
        include: [
            {
                model: Address, attributes: ['city']
            },
            {
                model: Category,
                attributes: ['categoryId', 'categoryName'],
                include: [
                    {
                        model: SubCategory
                    }
                ]
            },
            {
                model: Files, as: 'img', attributes: ['downloadLink']
            }
        ]
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next);
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


router.get('/subCat/:userId', async function (req, res, next) {
    console.log(1, req.params);
    User.findOne({
        // include: [{
        //     model: Professional,
        //     include: [{
        //         model: SubCategory
        //     }]
        // }],
        where: { userId: req.params.userId }
    }).then((pro) => {
        console.log(2, pro);
        res.json({ success: true, data: pro });
    }).catch(next => {
        console.log(next);
    })
})

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
        }).catch(next);
    }).catch(next);
})


router.put('/user/update', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    User.update(req.body, { where: { userId: req.user.userId } }).then((updatedData) => {
        res.json({ success: true, data: updatedData });
    }).catch(next);
})

// To get user details by id.

router.get('/user-details/:id', async function (req, res, next) {
    User.findOne({
        attributes: ['userId', 'firstName', 'lastName', 'email'],
        where: { userId: req.params.id }
    }).then((userDetails) => {
        res.json({ success: true, data: userDetails });
    }).catch(next);
})

// Reset password.

router.put('/reset-password', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    let newData = {};
    let query = {};
    if (req.body.password && req.body.password.length) {
        newData.password = Professional.generateHash(req.body.password);
    }
    if (newData.errors) {
        return next(newData.errors[0]);
    }
    query.where = { proId: req.user.proId };

    Professional.update(newData, query).then((updatedData) => {
        res.json({ success: true, data: updatedData });
    }).catch();
});

// Get Professional image.

router.get('/professional-image/:proId', async function (req, res, next) {
    Professional.findOne({
        attributes: ['proId'],
        include: [
            {
                model: Files, as: 'img', attributes: ['fileId', 'downloadLink']
            }
        ],
        where: { proId: req.params.proId }
    }).then((proData) => {
        return res.json({ success: true, data: proData });
    }).catch(next);
});

// To update Professional.

router.put('/professional/update', async (req, res, next) => {
    Professional.update(req.body, { where: { proId: req.body.proId } }).then((updatedProfessional) => {
        res.json({ success: true, data: updatedProfessional });
    }).catch(next);
})

module.exports = router;