'use strict';

const Sequelize = require('sequelize');
let config = require(__dirname + '/../config/db-config');
const Op = Sequelize.Op


let db = {};
let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* MODELS */

/* CORE */
db.User = require('./core/user')(sequelize, Sequelize);
db.Category = require('./taskandearn/category')(sequelize, Sequelize);
db.SubCategory = require('./taskandearn/subCategory')(sequelize, Sequelize);
db.Professionals = require('./taskandearn/professionals')(sequelize, Sequelize);
db.Address = require('./taskandearn/address')(sequelize, Sequelize);
db.Task = require('./taskandearn/task')(sequelize, Sequelize);
db.Task_Pro = require('./taskandearn/task_pro')(sequelize, Sequelize);

/* MAPPING */
// db.User.belongsTo(db.Address, { foreignKey: 'addressId', sourceKey: 'addressId' });
db.Professionals.belongsTo(db.Category, { foreignKey: 'categoryId', sourceKey: 'categoryId' });
db.Professionals.belongsTo(db.Address, { foreignKey: 'addressId', sourceKey: 'addressId' });

db.User.belongsTo(db.Professionals, { foreignKey: 'proId', sourceKey: 'proId' });
db.Professionals.hasOne(db.User, { foreignKey: 'proId', sourceKey: 'proId' });

db.Category.hasMany(db.SubCategory, { foreignKey: 'categoryId', sourceKey: 'categoryId' });
db.SubCategory.belongsTo(db.Category, { foreignKey: 'categoryId', sourceKey: 'categoryId' });
db.Task.belongsTo(db.Category, { foreignKey: 'categoryId', sourceKey: 'categoryId' });
db.Task.belongsTo(db.Address, { foreignKey: 'addressId', sourceKey: 'addressId' });
db.Task.belongsTo(db.User, { foreignKey: 'userId', sourceKey: 'userId' });
db.Address.hasMany(db.Task, { foreignKey: 'addressId', sourceKey: 'addressId' });

db.Professionals.belongsToMany(db.SubCategory, { through: 'pro_subCat', foreignKey: 'proId', otherKey: 'subCategoryId' });
db.SubCategory.belongsToMany(db.Professionals, { through: 'pro_subCat', foreignKey: 'subCategoryId', otherKey: 'proId' });

db.Task.belongsToMany(db.SubCategory, { through: 'task_subCat', foreignKey: 'taskId', otherKey: 'subCategoryId' });
db.SubCategory.belongsToMany(db.Task, { through: 'task_subCat', foreignKey: 'subCategoryId', otherKey: 'taskId' });

db.Task.belongsToMany(db.Professionals, { through: 'task_pro', foreignKey: 'taskId' });
db.Professionals.belongsToMany(db.Task, { through: 'task_pro', foreignKey: 'proId' });


/* CORE */



module.exports = db;
