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
    

    socket.on("sendMessage", async ({chatRoomId, userId, messageId, uploadedImageUrls,friendId }) => {
      try {
        const status = 'sent'
        const newMessage = await updateMessage(status, messageId, uploadedImageUrls);
        io.to(friendId).emit("newMessageAlert", newMessage, chatRoomId)
        io.to(userId).emit("selfMessageAlert",  newMessage, chatRoomId);

      } catch (error) {
         const status = 'failed'
        const newMessage = await updateMessage(status, messageId, uploadedImageUrls);
        console.error("Error sending message:", error.message);
        io.to(userId).emit("sendMessageError", error.message, newMessage,chatRoomId);
      }
    });

    socket.on('messageDelivered', async({message,userId
    }) => {
      const status = 'delivered'
      const newMessage = await updateMessage(status, message._id);
      io.to(newMessage.sender.toString()).to(userId).emit("deliveredAlert", newMessage, newMessage.chatRoom);
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};
