const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://shivilpogba:kS6hiZyyVj6vTnGv@cluster0.6512haz.mongodb.net/', {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB
  