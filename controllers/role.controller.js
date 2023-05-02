const db = require('../models')
// create main Model
const Role = db.roles


// main work

const createRole = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const role = {
    id: req.body.id,
    role: req.body.role

  };

  // Save user in the database
  Role.create(role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the role."
      });
    });
};

module.exports = {
  createRole,
}
