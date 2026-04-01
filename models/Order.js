const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // តភ្ជាប់ទៅ User ដែលជាអ្នកទិញ
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    // បញ្ជីទំនិញដែលគេទិញ (Array)
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                ref: 'Product' 
            },
        }
    ],
    totalPrice: { type: Number, required: true, default: 0.0 },
    status: { type: String, default: 'Pending' }, // Pending, Paid, Delivered
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);