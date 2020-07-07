const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const User = require('../../models').User;

router.get('/', async function (req, res, next) {
    console.log('working')
    User.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

module.exports = router;