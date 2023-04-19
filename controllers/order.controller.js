const db = require('../models')
const Order = db.orders
const User = db.users

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
    };

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

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    getUserInfo
}