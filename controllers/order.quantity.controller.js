const db = require('../models');
const orderQuantity = db.order_quantity;

// Create and Save a new order

const createOrderQuantity = (req, res) => {
    // Validate request
    if (!req.body.quantity) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a order
    const order_quantity = {
        quantity: req.body.quantity
    };

    // Save order in the database
    orderQuantity.create(order_quantity)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order quantity."
            });
        });
};


module.exports = {
    createOrderQuantity,
}