const express = require('express');
const router = express.Router();
// ប្តូរការតម្លើងបែបនេះវិញ ដើម្បីឱ្យដឹងថាឈ្មោះណាខ្លះដែលត្រូវបាន Import មក
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');

// មើលទំនិញទាំងអស់
router.get('/', getAllProducts); 

// បន្ថែមទំនិញថ្មី
router.post('/', createProduct);

// លុបទំនិញ
router.delete('/:id', deleteProduct);

module.exports = router;