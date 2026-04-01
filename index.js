const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Create uploads folder (for Render)
const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Folder "uploads" created!');
}

// Middleware
app.use(cors());
app.use(express.json());

// Debug logs (IMPORTANT 🔥)
console.log("Loading Routes...");

// Routes
try {
  app.use('/api/auth', require('./routes/userRoutes'));
  console.log("✅ userRoutes loaded");

  app.use('/api/products', require('./routes/productRoutes'));
  console.log("✅ productRoutes loaded");

  app.use('/api/orders', require('./routes/orderRoutes'));
  console.log("✅ orderRoutes loaded");

  app.use('/api/upload', require('./routes/uploadRoutes'));
  console.log("✅ uploadRoutes loaded");

} catch (error) {
  console.error("❌ Route loading error:", error.message);
}

// Static folder
app.use('/uploads', express.static(uploadDir));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});