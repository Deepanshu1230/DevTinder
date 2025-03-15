const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.DB_CONNECTION_SECRET) {
      throw new Error("❌ Missing DB_CONNECTION_SECRET in environment variables!");
    }

    await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database Connection established...");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1); // Stop the process if DB connection fails
  }
};

module.exports = connectDb;
