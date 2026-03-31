const Product = require('../models/Product');

// មុខងារលុបទំនិញ
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        
        // ប្រើ findByIdAndDelete ដើម្បីលុបតាម ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "រកមិនឃើញទំនិញដែលត្រូវលុបទេ!" });
        }

        res.json({ 
            message: "លុបទំនិញបានជោគជ័យ! 🗑️",
            data: deletedProduct 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};