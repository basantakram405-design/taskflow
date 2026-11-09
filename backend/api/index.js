// Vercel serverless entry point
const app = require('../src/app');
const connectDB = require('../src/config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    return res.status(500).json({ message: 'Database connection failed' });
  }
  return app(req, res);
};
