module.exports = (sequelize, Sequelize) => {
    const orderQuantity = sequelize.define("order_quantity", {
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return orderQuantity;
};