'use strict';

module.exports = (sequelize, DataTypes) => {
    let Address = sequelize.define('address', {
        addressId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pincode: {
            type: DataTypes.INTEGER(6),
            allowNull: false
        },
        fullAddress: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'address',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Address
};