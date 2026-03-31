const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts); // ផ្លូវពេញគឺ /api/v1/posts
module.exports = router;