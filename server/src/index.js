import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import friendsRoutes from "./routes/friendsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();
dotenv.config();

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use("/api/auth", authRoutes);
app.use("/api/upload", authMiddleware, uploadRoutes);
app.use("/api/friends", authMiddleware, friendsRoutes);
app.use("/api/chatPage", authMiddleware, chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
