import mongoose from "mongoose";

const connectDB = async () => {
  console.log("URI: ", process.env.DATABASE_URI);
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("DB connected!");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

export default connectDB;
