import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.CONNECTION_STRING);
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database is connected...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
