const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("Database connection error");
    console.error(error);
    process.exit(1);
  }
};
