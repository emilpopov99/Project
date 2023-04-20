// import controllers 
const userController = require('../controllers/user.controller.js')
const orderController = require('../controllers/order.controller.js')
const productController = require('../controllers/product.controller.js')
const orderQuantityController = require('../controllers/order.quantity.controller.js')



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
router.post('/order_quantities/createOrderQuantity', orderQuantityController.createOrderQuantity)


//Product Controller
router.post('/products/createProduct', productController.createProduct)
router.get('/products/allProducts', productController.getAllProducts)
router.get('/products/:id', productController.getProduct)
router.put('/products/updateProduct/:id', productController.updateProduct)
router.delete('/products/deleteProduct/:id', productController.deleteProduct)

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};

module.exports = router