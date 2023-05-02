const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        status: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        productId: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        hash: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        }
    });

    return Order;
};