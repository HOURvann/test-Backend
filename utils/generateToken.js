const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // បង្កើត Token ដែលមានសុពលភាព ៣០ថ្ងៃ
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;