const Product = require('../models/Product');

// @desc    ទាញយកទំនិញទាំងអស់
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error ទាញទិន្នន័យទំនិញ" });
    }
};

// @desc    ទាញយកទំនិញតែមួយតាម ID (សម្រាប់ទំព័រ Detail)
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "រកមិនឃើញទំនិញនេះទេ" });
        }
    } catch (error) {
        res.status(500).json({ message: "ID មិនត្រឹមត្រូវ" });
    }
};