const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
var passport = require('passport');

/* CORE */

const authRouter = require('./routes/core/auth');
const usersRouter = require('./routes/core/users');
const category = require('./routes/taskandearn/category')
const subCategory = require('./routes/taskandearn/subCategory')
const Task = require('./routes/taskandearn/task')
const Professional = require('./routes/taskandearn/professionals')

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const app = express();

const originsWhitelist = [
    ''
];

originsWhitelist.push('http://localhost:4200');
originsWhitelist.push('http://localhost:8000');
originsWhitelist.push('https://taskandearn-dev.herokuapp.com');
originsWhitelist.push('http://app.taskandearn.com');
originsWhitelist.push('https://app.taskandearn.com');
originsWhitelist.push('http://taskandearn.com');
originsWhitelist.push('https://taskandearn.com');
originsWhitelist.push('http://www.taskandearn.com');
originsWhitelist.push('https://www.taskandearn.com');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/home', express.static('dist/taskandearn'));
app.use('/login', express.static('dist/taskandearn'));
app.use('/registration', express.static('dist/taskandearn'));
app.use('/resetpassword/:token', express.static('dist/taskandearn'));
app.use('/become-earner-login', express.static('dist/taskandearn'));
app.use('/professionals-new', express.static('dist/taskandearn'));
app.use('/register', express.static('dist/taskandearn'));

app.use('/employee/edashboard', express.static('dist/taskandearn'));
app.use('/joinaspro', express.static('dist/taskandearn'));
app.use('/task', express.static('dist/taskandearn'));
app.use('/hire-pro', express.static('dist/taskandearn'));
app.use('/search-task', express.static('dist/taskandearn'));
app.use('/subcategory/:categoryId', express.static('dist/taskandearn'));
app.use('/professionals', express.static('dist/taskandearn'));
app.use('/alltasks', express.static('dist/taskandearn'));
app.use('/taskdetails/:taskId', express.static('dist/taskandearn'));
app.use('/mytasks', express.static('dist/taskandearn'));
app.use('/applied', express.static('dist/taskandearn'));
app.use('/profile', express.static('dist/taskandearn'));
app.use('/profile/:userId', express.static('dist/taskandearn'));
app.use('/terms', express.static('dist/taskandearn'));
app.use('/privacy', express.static('dist/taskandearn'));
app.use('/aboutus', express.static('dist/taskandearn'));
app.use('/requested', express.static('dist/taskandearn'));
app.use('/profile-detail', express.static('dist/taskandearn'));
app.use('/profile-detail/:proId', express.static('dist/taskandearn'));


app.use(express.static('dist/taskandearn'));
app.use(cookieParser());

// Enabling CORS

app.use(cors({
    origin: (origin, callback) => {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}));

app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/auth', authRouter);
app.use('/api/users', authRouter)

app.use('/api/user', usersRouter);
app.use('/api/category', category);
app.use('/api/subcategory', subCategory);
app.use('/api/task', Task);
app.use('/api/professionals', Professional);

// error handler, don't remove next

app.use(function (err, req, res, next) {
    let errorCode = '';
    const errorCodes = [
        'MISSING_USERNAME',
        'MISSING_PASSWORD',
        'INVALID_USERNAME',
        'INVALID_PASSWORD',
        'INVALID_EMAIL',
        'PERMISSION_DENIED',
        'MISSING_EMAIL',
    ];

    switch (err.name) {
        case 'TokenExpiredError':
            errorCode = 'expired_token';
            break;
        case 'JsonWebTokenError':
            errorCode = 'invalid_token';
            break;
        case 'SequelizeUniqueConstraintError':
            errorCode = 'duplicated_' + Object.keys(err.fields)[0];
            break;
        case 'SequelizeDatabaseError':
            errorCode = 'invalid_inputs';
            break;
        default:
            errorCode = 'unrecognized';
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        errorCode = 'INCORRECT_FILE_SIZE';
    }
    if (err.message && errorCodes.includes(err.message.toUpperCase())) {
        errorCode = err.message;
    }
    res.json({
        success: false,
        error: {
            name: errorCode.toUpperCase()
        }
    });
});

module.exports = app;