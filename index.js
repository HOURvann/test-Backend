const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// ១. កំណត់ការប្រើប្រាស់ dotenv (ដាក់ខាងលើគេបង្អស់)
dotenv.config();

// ២. ភ្ជាប់ទៅកាន់ MongoDB
connectDB();

const app = express();

// ៣. បង្កើត Folder 'uploads' ដោយស្វ័យប្រវត្តិ (ការពារការ Crash លើ Render)
const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Folder "uploads" ត្រូវបានបង្កើត!');
}

// ៤. Middleware
app.use(cors()); 
app.use(express.json()); 

// ៥. កំណត់ផ្លូវ (Routes)
// ខ្ញុំប្តូរពី /api/users មកជា /api/auth ដើម្បីឱ្យដូចអ្វីដែលអ្នកចង់បានក្នុង Postman
app.use('/api/auth', require('./routes/userRoutes')); 
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// ធ្វើឱ្យ Folder uploads អាចមើលឃើញជាសាធារណៈ
app.use('/uploads', express.static(uploadDir));

// ផ្លូវសម្រាប់តេស្ត Server
app.get('/', (req, res) => {
    res.send('API កំពុងដំណើរការយ៉ាងរលូន...');
});

// ៦. បើក Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server កំពុងដើរលើ Port ${PORT}`);
});