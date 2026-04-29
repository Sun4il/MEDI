require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const { logError, logInfo, logWarn } = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const dbConnected = await connectDB();

    if (!process.env.MONGODB_URI) {
      logWarn("MONGODB_URI is not set. Falling back to the local MongoDB URI.");
    }

    if (!dbConnected) {
      logWarn("MongoDB is not reachable right now. The backend will still start, but database routes will fail until the database is available.");
    }

    configureCloudinary();

    app.listen(PORT, () => {
      logInfo(`Backend server is running on port ${PORT}`);
    });
  } catch (error) {
    logError("Failed to start backend server", { error: error.message });
    process.exit(1);
  }
};

startServer();