const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error(err));

// Routes - ហៅពី Folder routes មកប្រើ
app.use('/api/v1/products', require('./routes/productRoutes'));
app.use('/api/v1/posts', require('./routes/postRoutes'));
// app.use('/api/v1/orders', require('./routes/orderRoutes')); // បើកពេលសរសេររួច

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));