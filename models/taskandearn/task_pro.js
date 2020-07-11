'use strict';

module.exports = (sequelize, DataTypes) => {
    let Task_Pro = sequelize.define('task_pro', {
        task_ProId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('apply', 'request'),
            allowNull: false
        }

    }, {
        tableName: 'task_pro',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Task_Pro
};