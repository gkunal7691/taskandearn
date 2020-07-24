'use strict';

module.exports = (sequelize, DataTypes) => {
    let Professionals = sequelize.define('professionals', {
        proId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        introduction: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: true,
        },
        dob: {
            type: DataTypes.INTEGER,
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