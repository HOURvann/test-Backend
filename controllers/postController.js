const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    const allPosts = await Post.find();
    res.json(allPosts);
};
// ... ថែមមុខងារ Create, Update, Delete ផ្សេងៗទៀត