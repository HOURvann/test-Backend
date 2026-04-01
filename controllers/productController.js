const Product = require('../models/Product');

// GET all
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET one
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// CREATE
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.status(201).json(saved);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};