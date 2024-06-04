import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoDb = async () => {
  try {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error`);
    process.exit(1);
  }
};