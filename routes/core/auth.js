const router = require('express').Router();
const jwt = require('jsonwebtoken');
var passport = require('passport');
const User = require('../../models').User
const config = require('../../config/config');
// const nodemailer = require("nodemailer");

const request = require('request');
const uuidv1 = require('uuid/v1');
const emailUtils = require('../../../taskandearn/utils/aws');

const passwordResetDetails = {
    apiUrl: 'https://api.postageapp.com/v.1.0/send_message.json',
    api_key: "kn0hVBIvzooPXynHSPjZtR9agqYJL4XD",
    emailTemplate: "Security-PasswordReset",
};

router.get('/check-token', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.send({ success: true, user: req.user });
});

router.get('/:id?', async function (req, res, next) {
    const query = {};
    if (req.query && req.query.email) {
        query.where = query.where || {};
        query.where.email = req.query.email;
    }
    User.findAndCountAll(query).then((users) => {
        console.log(users);
        if (users.count == 0) {
            return res.json({ emailTaken: false });
        }
        return res.json({ emailTaken: true });
    }).catch(next)
});

/* Login user. */
router.post('/login', function (req, res, next) {
    if (!req.body.email)
        return next(new Error('missing_email'));
    if (!req.body.password)
        return next(new Error('missing_password'));

    User.findOne({ where: { email: req.body.email.toLowerCase() }, raw: false }).then((user) => {
        if (!user)
            return next(new Error('invalid_email'));
        if (!user.isValidPassword(req.body.password))
            return next(new Error('invalid_password'));
        let expiresIn = req.body.rememberMe ? '15d' : '1d';
        let token = jwt.sign({
            userId: user.userId,
            email: user.email.toLowerCase(),
            firstName: user.firstName,
            lastName: user.lastName,
            professionalId: user.proId,
            // roleId: user.roleId,
            // orgId: user.organizationId
        }, config.jwt.secret, { expiresIn: expiresIn, algorithm: config.jwt.algorithm });

        res.json({
            success: true,
            data: {
                token: token
            }
        });

        User.update({ lastLogin: new Date() }, { where: { userId: user.id } });
    }).catch(next)
});

// Password Reset mail

router.post('/forgotpassword', async function (req, res, next) {

    let url = req.headers.origin + "/" + "/resetpassword/";

    User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
            res.json({ success: false, data: 'invalid email' });
        } else {
            let token = jwt.sign({
                data: user
            }, config.jwt.secret, { expiresIn: 60 * 60 });
            let link = url + token;

            let templateData = '<p><b>Dear ' + user.firstName + ' ' + user.lastName + '</b></p><br><p>You recently requested to reset your password from the Taskandearn Team. Click the link below to complete the process.</p><br/> <a href="' + `${link}` + '" class="button"> <strong>Reset Password </strong></a> <p style="font-family: Arial, sans-serif; font-size: 14px; color: #232740">Sincerely, <br>Team Taskandearn</p>'

            emailUtils.email(user.email, templateData, 'Taskandearn- Reset You Password', function (emaildata) {
                if (emaildata.success) {
                    res.json({ success: true, data: emaildata.data });
                } else {
                    res.json({ success: false, data: emaildata.data });
                }
            })
        }
    }).catch(next)
});


//reset password
router.patch('/', function (req, res, next) {

    var decoded = jwt.verify(req.body.token, config.jwt.secret);

    let newData = {};
    let query = {};

    if (req.body.password && req.body.password.length)
        newData.password = User.generateHash(req.body.password);

    if (newData.errors)
        return next(newData.errors[0]);

    query.where = { userId: decoded.data.userId };

    User.update(newData, query).then(() => {
        res.json({ success: true });
    }).catch(next)
});

module.exports = router;
