import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.info("Mongodb is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not available");
    return;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "safe-space",
    });
    isConnected = true;
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
