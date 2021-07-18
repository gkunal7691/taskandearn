"use strict";

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let config = {};

config.production = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: "mysql",
        migrationStorage: "json",
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        }
    },
    jwt: {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS512'
    },
};

config.development = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: "mysql",
        migrationStorage: "json",
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        }
    },
    jwt: {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS512'
    },
};



config.local = {
    // db: {
    //     username: "root",
    //     password: "",
    //     database: "a6b4cocv5wdjwnlz",
    //     host: "127.0.0.1",
    //     dialect: "mysql",
    //     migrationStorage: "json",
    //     define: {
    //         charset: 'utf8',
    //         collate: 'utf8_general_ci',
    //         timestamps: true
    //     }
    // },
    db: {
        username: "hdct1pzft58vq9pz",
        password: "l7gq37erc9tfm7gt",
        database: "a6b4cocv5wdjwnlz",
        host: "lmc8ixkebgaq22lo.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        dialect: "mysql",
        migrationStorage: "json",
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        }
    },
    jwt: {
        secret: '1TJ!$v:BcQ^/Qy7|j9T8]+(B{~/Uyuh%fNiEPoj4{;VE{}(9~Y#31E?]u:MN;ai',
        algorithm: 'HS512'
    },
};

module.exports = config[env];