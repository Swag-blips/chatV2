import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import cors from "cors";
import songsRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import path from "path";
import { dirname } from "path";
import statRoutes from "./routes/stat.route.js";
import { clerkMiddleware } from "@clerk/express";
import connectMongo from "./db/connectMongo.js";
import { fileURLToPath } from "url";
import fileupload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
app.use(clerkMiddleware());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(dirname(__filename), "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
  connectMongo();
});
