'use strict';

module.exports = (sequelize, DataTypes) => {
    let Address = sequelize.define('address', {
        addressId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contactStatus: {
            type: DataTypes.ENUM(
                'Yes',
                'No'
            )
        },
    }, {
        tableName: 'address',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Address
};