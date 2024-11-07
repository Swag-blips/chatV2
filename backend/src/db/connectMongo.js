import mongoose from "mongoose";

 const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongodb ${connection.connection.host}`);
  } catch (err) {
    console.log(`Failed to connect to mongo db ${err}`);
    process.exit(1);
  }
};




export default connectMongo