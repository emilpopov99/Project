const { or } = require('sequelize');
const db = require('../models')
const Order = db.orders
const User = db.users
const { v4: uuidv4 } = require('uuid');


// Create and Save a new order

const createOrder = (req, res) => {
  // Validate request
  if (!req.body.status) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a order
  const order = {
    status: req.body.status,
    userId: req.body.userId,
    productId: req.body.productId
  };
  console.log(order.status, order.userId)

  // Save order in the database
  Order.create(order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order."
      });
    });
};


const updateOrder = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    });
};

const getOrder = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find order with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving order with id=" + id
      });
    });
};


// Get All Orders

const getAllOrders = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

const getUserInfo = async (req, res) => {

  const id = req.params.id

  const data = await Order.findAll({
    include: [{
      model: User,
      as: 'user'
    }],
    where: { id: id }
  })

  res.status(200).send(data)
}

Order.beforeCreate((order) => {
  order.hash = uuidv4();
});

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  getAllOrders,
  getUserInfo
}