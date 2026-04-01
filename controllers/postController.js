
exports.getAllPosts = async (req, res) => {
    const allPosts = await Post.find();
    res.json(allPosts);
};
const Post = require('../models/Post');

// មុខងារទាញយកអត្ថបទតែមួយតាម ID
exports.getPostById = async (req, res) => {
    try {
        // ប្រើ findById ដើម្បីស្វែងរកក្នុង MongoDB
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "រកមិនឃើញអត្ថបទនេះទេ!" });
        }
        
        res.json(post);
    } catch (error) {
        // បើ ID ខុសទម្រង់ វានឹងលោតមក catch នេះ
        res.status(500).json({ message: "លេខ ID មិនត្រឹមត្រូវ ឬមានបញ្ហាម៉ាស៊ីនបម្រើ!" });
    }
};