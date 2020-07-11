'use strict';

module.exports = (sequelize, DataTypes) => {
    let SubCategory = sequelize.define('subcategory', {
        subCategoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SubCategoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'subcategory',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return SubCategory
};