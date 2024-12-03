import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on ${PORT}`);
});
