// controllers/productController.js
const Product = require('../models/Product');

// ១. ត្រូវមាន exports.getAllProducts
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ២. ត្រូវមាន exports.createProduct
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ៣. ត្រូវមាន exports.deleteProduct (ដែលអ្នកទើបសរសេរមុននេះ)
exports.deleteProduct = async (req, res) => {
    try {
        // ១. ចាប់យក ID ពី URL (ឧទាហរណ៍៖ /api/v1/products/123)
        const { id } = req.params;

        // ២. បញ្ជាទៅ MongoDB ឱ្យលុបទិន្នន័យតាម ID នោះ
        // ប្រើ findByIdAndDelete ដើម្បីលុបចេញពី Database តែម្ដង
        const deletedProduct = await Product.findByIdAndDelete(id);

        // ៣. ឆែកមើលថា តើមានទិន្នន័យនោះសម្រាប់លុបដែរឬទេ?
        if (!deletedProduct) {
            return res.status(404).json({ 
                success: false,
                message: "រកមិនឃើញទំនិញដែលអ្នកចង់លុបឡើយ!" 
            });
        }

        // ៤. បើលុបជោគជ័យ ផ្ញើសារប្រាប់ទៅ Frontend វិញ
        res.status(200).json({
            success: true,
            message: "លុបទំនិញបានជោគជ័យ! 🗑️",
            data: deletedProduct // អាចផ្ញើទិន្នន័យដែលទើបលុបទៅឱ្យគេមើលផងក៏បាន
        });

    } catch (error) {
        // ករណីមាន Error (ដូចជាលេខ ID ខុសទម្រង់ជាដើម)
        res.status(500).json({ 
            success: false,
            message: "មានបញ្ហាបច្ចេកទេសក្នុងការលុបទិន្នន័យ!",
            error: error.message 
        });
    }
};