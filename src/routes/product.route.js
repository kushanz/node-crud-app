const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const verifyToken = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', verifyToken,getAllProducts)
router.post('/',createProduct)
router.get('/:id',getProductById)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)


module.exports = router;