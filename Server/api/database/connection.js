import mongoose from "mongoose";
import { MONGOOSE_URL } from "../../config.js";

// ******************************
// mongoose connect
// ******************************
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGOOSE_URL, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log(`Database Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
