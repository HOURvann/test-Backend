const Post = require('../models/Post');

// ១. ទាញយកអត្ថបទទាំងអស់ (GET)
exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ២. ទាញយកអត្ថបទតែមួយតាម ID (GET by ID)
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "រកមិនឃើញអត្ថបទនេះទេ!" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "លេខ ID មិនត្រឹមត្រូវ!" });
    }
};

// ៣. បង្កើតអត្ថបទថ្មី (POST) <--- ជួរនេះហើយដែលធ្វើឱ្យអ្នក Create បាន
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ៤. កែសម្រួលអត្ថបទ (PUT)
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};