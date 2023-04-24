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
db.orders = require('./order.model.js')(sequelize, DataTypes)
db.order_quantities = require('./order.quantity.model.js')(sequelize, DataTypes)
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);

db.orders.belongsTo(db.users)
db.users.hasMany(db.orders)

db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userID",
    otherKey: "roleID"
});

db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleID",
    otherKey: "userID"
});

db.orders.belongsToMany(db.products, {
    through: "order_quantity",
    foreignKey: "orderID",
    otherKey: "productID"
});

db.products.belongsToMany(db.orders, {
    through: "order_quantity",
    foreignKey: "productID",
    otherKey: "orderID"
});

db.ROLES = "User", "Admin";

module.exports = db