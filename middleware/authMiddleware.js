// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // ឆែកមើលក្នុង Header ថាមាន "Authorization: Bearer <token>" ដែរឬទេ
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // ចាប់យក Token ចេញពី String "Bearer xxxxxxx"
      token = req.headers.authorization.split(' ')[1];

      // បំបែកកូដ Token (Verify)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // បោះទិន្នន័យ User ទៅក្នុង Request (លើកលែងលេខសម្ងាត់) ដើម្បីប្រើក្នុង Controller បន្ត
      req.user = await User.findById(decoded.id).select('-password');

      next(); // អនុញ្ញាតឱ្យទៅមុខទៀត
    } catch (error) {
      res.status(401).json({ message: 'មិនទាន់បាន Login ឬ Token មិនត្រឹមត្រូវ' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'រកមិនឃើញ Token ទេ' });
  }
};

module.exports = { protect };