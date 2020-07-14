const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const { User } = require('../../models').User
const Category = require('../../models').Category;
const Address = require('../../models').Address
const Professional = require('../../models').Professionals


// router.get('/', async function (req, res, next) {
//     Professional.findAll().then((data) => {
//         res.json({ success: true, data: data });
//     }).catch(next)
// });



router.get('/', function (req, res, next) {
    Professional.findAll({
        include: [

            {
                model: User,
            },
            // {
            //     model: Address
            // }

        ],

    }).then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});









module.exports = router; 
