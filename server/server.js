import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messageRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/matches", matchRoutes);

app.listen(PORT, console.log("Listening on port" + " " + PORT));
