'use strict';

module.exports = (sequelize, DataTypes) => {
    let PopularService = sequelize.define('popularService', {
        popularServiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagePath: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        popularServiceName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'popularService',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return PopularService;
};