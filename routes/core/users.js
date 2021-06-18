const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
var passport = require('passport');
const User = require('../../models').User;
const emailUtils = require('../../utils/aws');

router.get('/email', async function (req, res, next) {
    User.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

/* Get user by ID or users list. */

router.get('/:id?', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const query = {};
    if (req.query && req.query.email) {
        query.where = query.where || {};
        query.where.email = req.query.email;
    }

    User.findAndCountAll(query).then((users) => {
        res.json({ success: true, data: users.rows, count: users.count });
    }).catch(next)
});


router.post('/registration', function (req, res, next) {
    let templateData = '<p><b>Dear ' + req.body.firstName + ' ' + req.body.lastName + '</b></p><br><p>You have signup successfully with Taskandearn.</p><br/>  <p style="font-family: Arial, sans-serif; font-size: 14px; color: #232740">Sincerely, <br>Team Taskandearn</p>'
    User.create({
        email: req.body.email,
        password: User.generateHash(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roleId: 1
    }).then((user) => {
        emailUtils.email(user.email, templateData, 'Taskandearn- Registration Successfully', function (emaildata) {
            res.json({ success: true, data: user })
        })

    }).catch(next);
});

// Reset password

router.put('/reset', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    let newData = {};
    let query = {};
    if (req.body.password && req.body.password.length)
        newData.password = User.generateHash(req.body.password);
    if (newData.errors)
        return next(newData.errors[0]);
    query.where = { userId: req.user.userId };

    User.update(newData, query).then(() => {
        res.json({ success: true });
    }).catch(next => {
        console.log(next)
    })
});


/* Delete user by ID. */

router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.json({ success: true });
    }).catch(next)
});

/* count user */

router.post('/countuser', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.count({
        where: { organizationId: req.body.organizationId }
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

// Admin List

router.get('/admin/allAdminList', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.findAll({
        where: { organizationId: req.user.orgId, roleId: 2 }, order: [['updatedAt', 'DESC']],
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

// User List

router.get('/superAdmin/userList', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.findAll({
        where: { organizationId: req.user.orgId }, order: [['updatedAt', 'DESC']],
        include: [
            { model: userInfo }
        ]
    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.post('/superAdmin/createUser', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: User.generateHash(req.body.password), roleId: req.body.roleId, createdBy: req.body.createdBy, organizationId: req.body.organizationId }).then((result) => {
        res.json({ success: true, data: result })
    }).catch(next);
});

router.post('/createUserMetaList', async function (req, res, next) {
    var userMetaList = req.body.metaList;
    var userMetaCount = 0
    userMetaList.forEach((userMeta, userMetaIndex, userMetaArray) => {
        UserMeta.create({ metaKey: userMeta.metaKey, metaValue: userMeta.metaValue, userId: req.body.userId, createdBy: req.body.userId }).then((result) => {
            if (userMetaCount === userMetaArray.length - 1) {
                res.json({ success: true, data: result })
            }
            userMetaCount++
        }).catch(next);
    })
});

/* Update Client with U */

router.post('/updateUser', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.update({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email },
        { where: { id: req.body.clientId } }).then((data) => {
            res.json({ success: true, data: data })
        }).catch(next)
})

//To update a selected user.

router.put('/superAdmin/updateUser', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    User.update({
        firstName: req.body.firstName, lastName: req.body.lastName,
        email: req.body.email, roleId: req.body.roleId
    }, {
        where: { id: req.body.id, organizationId: req.user.orgId }
    }).then(() => {
        userInfo.update({
            designation: req.body.desg, secondaryEmail: req.body.secEmail,
            tempAddress: req.body.tempAddress, permanentAddress: req.body.permanentAddress,
            mobile: req.body.mobile, bank: req.body.bank, doj: req.body.doj,
            bankAccountNo: req.body.bankAccountNo, pfNumber: req.body.pfNumber,
            location: req.body.location, department: req.body.dept
        }, {
            where: { userId: req.body.id }
        }
        ).then((result) => {
            res.json({ success: true, data: result });
        })
    }).catch(next);
})




module.exports = router;