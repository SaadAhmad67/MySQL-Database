const express = require("express");
const products = require("../models/index");
const router = express.Router();
const productController  = require('../controller/productContoller');

router.route('/products').post(productController.addProduct);

router.route('/products/:productId').get(productController.getSingleProduct);

router.route('/products').get(productController.getAllProduct);
//rendring route
router.route('/showProducts').get(productController.showProduct);

router.route('/products/:productId').put(productController.changeProduct);
//delete.
router.route('/products/:productId').delete(productController.deleteProduct);

module.exports = router;