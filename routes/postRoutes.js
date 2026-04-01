const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// ផ្លូវសម្រាប់ទាញយកអត្ថបទទាំងអស់
router.get('/', postController.getAllPosts); 

// ផ្លូវសម្រាប់ទាញយកអត្ថបទតែមួយតាម ID (បន្ថែមជួរនេះ)
router.get('/:id', postController.getPostById); 

module.exports = router;