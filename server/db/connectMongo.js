import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb ${connection.connection.host}`);
  } catch (err) {
    console.error(`an error occured connecting to mongo db ${err.message}`);
    process.exit(1);
  }
};
