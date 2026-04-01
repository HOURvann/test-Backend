const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// មើលទំនិញទាំងអស់
router.get('/', productController.getAllProducts);

// បន្ថែមទំនិញថ្មី
router.post('/', productController.createProduct);

// លុបទំនិញ (បន្ថែមជួរនេះ)
router.delete('/:id', productController.deleteProduct);

module.exports = router;