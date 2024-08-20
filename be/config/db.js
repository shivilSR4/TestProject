const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://shivilkravi:m5CtySw61b6NvFr7@cluster0.f344n.mongodb.net/', {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB
  