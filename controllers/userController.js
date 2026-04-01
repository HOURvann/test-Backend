const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    ចុះឈ្មោះអ្នកប្រើប្រាស់ថ្មី
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'អ៊ីមែលនេះមានគេប្រើរួចហើយ' });

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // ផ្ញើ Token ទៅឱ្យ Frontend ភ្លាមៗ
        });
    } else {
        res.status(400).json({ message: 'ទិន្នន័យមិនត្រឹមត្រូវ' });
    }
};

// @desc    ចូលប្រើប្រាស់ (Login)
// @route   POST /api/users/login
exports.authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // ឆែកមើល Password (ប្រើ method matchPassword ដែលយើងនឹងថែមក្នុង Model)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ' });
    }
};