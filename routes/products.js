var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.route('/')
  .get(productController.getAllProducts)
  .post(productController.createNewProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/:id')
  .get(productController.getProduct);  

module.exports = router;
