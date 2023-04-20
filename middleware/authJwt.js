const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

checkIfIsAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

checkIfIsUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "User") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require User Role!"
      });
    });
  });
};

checkIfIsUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "User") {
          next();
          return;
        }

        if (roles[i].name === "Admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require User or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  checkIfIsAdmin: checkIfIsAdmin,
  checkIfIsUser: checkIfIsUser,
  checkIfIsUserOrAdmin: checkIfIsUserOrAdmin
};
module.exports = authJwt;