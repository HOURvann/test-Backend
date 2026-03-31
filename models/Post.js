const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    imageUrl: String,
    createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
});
module.exports = mongoose.model('Post', postSchema);