'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    let Professionals = sequelize.define('professionals', {
        proId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        mobile: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        hobbies: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'professionals',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });

    Professionals.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    Professionals.prototype.isValidPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    };

    Professionals.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());

        delete values.password;

        return values;
    };

    return Professionals
};