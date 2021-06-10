const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
var passport = require('passport');
const User = require('../../models').User;
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "AKIA25JSAUFAOCGAYC6N",
    secretAccessKey: "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",
    region: 'ap-south-1'
});

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

// router.get('/:id?', async function (req, res, next) {

//     User.findOne({ where: { userId: req.params.id } }).then((users) => {
//         res.json({ success: true, data: users });
//     }).catch(next)
// });


router.post('/registration', function (req, res, next) {
    // console.log('body ======', req.body)
    User.create({
        email: req.body.email,
        password: User.generateHash(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // phone: req.body.phone,
        // dob: req.body.dob,
    }).then((user) => {
        res.json({ success: true, data: user })

        // console.log(user)
        // User.update({ createdBy: user.id }, { where: { id: user.id } }).then(() => {
        //     res.json({ success: true, data: user })
        // }).catch(next);
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





// Create sendEmail params 
var params = {
  Destination: { /* required */
    ToAddresses: [
      'gyanu.mahesh@softobotics.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
     }
    },
  Source: 'notification@taskandearn.com', /* required */
};

// Create the promise and SES service object
router.get('/aws/email', function (req, res, next) {
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
sendPromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
// snippet-end:[ses.JavaScript.email.sendEmail]

})




module.exports = router;