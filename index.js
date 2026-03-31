const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ១. ភ្ជាប់ទៅកាន់ MongoDB Atlas (ប្រើ MONGO_URI ពី Environment Variable)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas! 💾"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// ២. បង្កើត Schema និង Model (ទម្រង់ទិន្នន័យក្នុង Database)
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    imageUrl: String,
    createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const Post = mongoose.model('Post', postSchema);

// --- API ROUTES ---

// test route
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB 🚀');
});

// GET all posts (ទាញពី MongoDB)
app.get('/api/v1/posts', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new post (រក្សាទុកក្នុង MongoDB)
app.post('/api/v1/posts', async (req, res) => {
    try {
        const { title, content, author, imageUrl, createdAt } = req.body;
        const newPost = new Post({
            title,
            content,
            author,
            imageUrl,
            createdAt
        });
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET post by ID
app.get('/api/v1/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format" });
    }
});

// PUT update post
app.put('/api/v1/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            { title: req.body.title }, 
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE post
app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully from Database" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});