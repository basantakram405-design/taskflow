const mongoose = require('mongoose');

// Cached connection so serverless invocations (Vercel) reuse it
let connection = null;

module.exports = async function connectDB() {
  if (connection) return connection;
  connection = mongoose.connect(process.env.MONGO_URI).then((m) => {
    console.log('MongoDB connected');
    return m;
  });
  try {
    return await connection;
  } catch (err) {
    connection = null;
    throw err;
  }
};
