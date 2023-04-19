module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        role: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        middleName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    });

    return User;
};