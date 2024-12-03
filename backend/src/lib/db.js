import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(connection.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
