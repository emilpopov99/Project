// import controllers 
const userController = require('../controllers/user.controller.js')
const orderController = require('../controllers/order.controller.js')
const productController = require('../controllers/product.controller.js')
const authController = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");



// router
const router = require('express').Router()


// User Controller
router.post('/users/createUser', userController.createUser)
router.get('/users/allUsers', userController.getAllUsers)
router.get('/users/:id', userController.getUser)
router.put('/users/updateUser/:id', userController.updateUser)
router.delete('/users/deleteUser/:id', userController.deleteUser)



// Order Controller
router.post('/users/createOrder', orderController.createOrder)
router.get('/orders/getOrder/:id', orderController.getOrder)
router.get('/orders/getUserInfo/:id', orderController.getUserInfo)
router.get('/orders/allOrders', orderController.getAllOrders)

// Order Quantity Controller


//Product Controller
router.post('/products/createProduct', productController.createProduct)
router.get('/products/allProducts', productController.getAllProducts)
router.get('/products/:id', productController.getProduct)
router.put('/products/updateProduct/:id', productController.updateProduct)
router.delete('/products/deleteProduct/:id', productController.deleteProduct)

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmailOrPassword,
            verifySignUp.checkRolesExisted
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);
};

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/test/all", userController.allAccess);
  
    app.get(
      "/api/test/user",
      [authJwt.verifyToken],
      userController.userBoard
    );
  
  
    app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      userController.adminBoard
    );
  };

module.exports = router