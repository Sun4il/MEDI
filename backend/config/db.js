const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb://127.0.0.1:27017/smart-medicine-finder";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = connectDB;