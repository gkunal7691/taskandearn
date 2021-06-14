'use strict';

module.exports = (sequelize, DataTypes) => {
    let Task = sequelize.define('task', {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postType: {
            type: DataTypes.ENUM(
                'individual',
                'company'
            )
        },
    }, {
        tableName: 'task',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Task
};