import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
