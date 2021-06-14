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
db.PopularService = require('./taskandearn/popularService')(sequelize, Sequelize);
db.Files = require('./taskandearn/files')(sequelize, Sequelize);
db.Role = require('./core/role')(sequelize, Sequelize);

/* MAPPING */
db.Professionals.belongsTo(db.Category, { foreignKey: 'categoryId', sourceKey: 'categoryId' });
db.Professionals.belongsTo(db.Address, { foreignKey: 'addressId', sourceKey: 'addressId' });

db.Role.hasMany(db.User, { foreignKey: 'roleId', sourceKey: 'roleId' });

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

db.Professionals.belongsTo(db.Files, { as: 'img' });

db.Professionals.belongsToMany(db.Files, { through: 'pro_file', foreignKey: 'proId', sourceKey: 'proId' });
db.Files.belongsToMany(db.Professionals, { through: 'pro_file', foreignKey: 'fileId', sourceKey: 'fileId' });

module.exports = db;
