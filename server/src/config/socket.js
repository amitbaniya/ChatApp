// config/socket.js
import { Server } from "socket.io";
import { addMessage, updateMessage } from "../controllers/chatController.js";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
      
      
    socket.on("registerUser", ({ userId }) => {
        socket.join(userId);
        console.log("User Connection");
    });
    
      
    socket.on("joinRoom", ({ chatRoomId }) => {
        socket.join(chatRoomId);
        console.log("Chat Room Connection");
    });

    socket.on("sendMessage", async ({ chatRoomId, userId, messageId, uploadedImageUrls,friendId }) => {
      try {
        const newMessage = await updateMessage(messageId, uploadedImageUrls);
        io.to(friendId).emit("newMessageAlert", newMessage, chatRoomId)
        io.to(userId).emit("selfMessageAlert",  newMessage, chatRoomId);
        io.to(chatRoomId).emit("receiveMessage", newMessage, chatRoomId);

      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("sendMessageError", {
          message: "Failed to send message",
          details: error.message,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};
