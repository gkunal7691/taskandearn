'use strict';

module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define('category', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagePath: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'category',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Category
};