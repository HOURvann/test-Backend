const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);  // សម្រាប់ Create
router.put('/:id', postController.updatePost); // សម្រាប់ Update

module.exports = router;