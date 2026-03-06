import mongoose from "mongoose";

const URI = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB connected!");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

export default connectDB;
