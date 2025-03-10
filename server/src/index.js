import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import friendsRoutes from "./routes/friendsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import http from "http";
import { Server } from "socket.io";
import { addMessage, sendMessage } from "./controllers/chatController.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use("/api/auth", authRoutes);
app.use("/api/upload", authMiddleware, uploadRoutes);
app.use("/api/friends", authMiddleware, friendsRoutes);
app.use("/api/chatPage", authMiddleware, chatRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ chatRoomId }) => {
    socket.join(chatRoomId);
  });

  socket.on("sendMessage", async ({ chatRoomId, userId, message }) => {
    const newMessage = await addMessage(chatRoomId, userId, message);
    io.to(chatRoomId).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
