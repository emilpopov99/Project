const dbConfig = require('../config/db.config.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, DataTypes)
db.users = require('./user.model.js')(sequelize, Sequelize)
db.orders = require('./order.model.js')(sequelize, DataTypes)
db.order_quantity = require('./order.quantity.model.js')(sequelize, DataTypes)
db.roles = require("../models/role.model.js")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});


db.order_quantity.belongsTo(db.orders)
db.order_quantity.belongsTo(db.products);
db.orders.belongsTo(db.users)
db.users.hasMany(db.orders)



db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

db.ROLES = ["User", "Admin"];




module.exports = db