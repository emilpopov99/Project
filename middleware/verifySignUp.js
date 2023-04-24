const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateEmailOrPassword = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }

        User.findOne({
            where: {
                password: req.body.password
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Password is already in use!"
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.role) {
        for (let i = 0; i < req.body.role.length; i++) {
            if (!ROLES.includes(req.body.role[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.role[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmailOrPassword: checkDuplicateEmailOrPassword,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;