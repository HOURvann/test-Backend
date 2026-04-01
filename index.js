const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // សំខាន់ណាស់ សម្រាប់ឱ្យ Frontend ភ្ជាប់មកបាន
const connectDB = require('./config/db');

// ១. Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// កំណត់ការប្រើប្រាស់ dotenv
dotenv.config();

// ២. ភ្ជាប់ទៅកាន់ MongoDB
connectDB();

const path = require('path');
const app = express();

// ៣. Middleware
app.use(cors()); // អនុញ្ញាតឱ្យ Vue Frontend ហៅ API បាន
app.use(express.json()); // អនុញ្ញាតឱ្យ Backend អានទិន្នន័យ JSON (req.body)

// ៤. កំណត់ផ្លូវ (Routes)
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/upload', require('./routes/uploadRoutes'));

// ធ្វើឱ្យ Folder uploads អាចមើលឃើញជាសាធារណៈ (Static)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// ផ្លូវសម្រាប់តេស្ត Server
app.get('/', (req, res) => {
    res.send('API កំពុងដំណើរការ...');
});

// ៥. បើក Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server កំពុងដើរលើ Port ${PORT}`);
});