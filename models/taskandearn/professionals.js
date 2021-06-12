'use strict';

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
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
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
        },
    }, {
        tableName: 'professionals',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Professionals
};