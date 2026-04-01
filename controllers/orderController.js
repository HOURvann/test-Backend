const Order = require('../models/Order');

// @desc    បង្កើតការបញ្ជាទិញថ្មី (Checkout)
// @route   POST /api/orders
// @access  Private (ត្រូវតែ Login)
exports.addOrderItems = async (req, res) => {
    const { orderItems, totalPrice, shippingAddress } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: "កន្ត្រកទំនិញទទេ" });
    } else {
        const order = new Order({
            user: req.user._id, // ចាប់យក ID ពី Token
            orderItems,
            shippingAddress,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};