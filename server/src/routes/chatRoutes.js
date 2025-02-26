import express from "express";
import {
  getChatRoom,
  createChatRoom,
  sendMessage,
  getMessages,
  chatList,
} from "../controllers/chatController.js";

const router = express.Router();
router.get("/chats/chatList", chatList);
router.get("/chatRoom", getChatRoom);
router.post("/chatRoom", createChatRoom);
router.post("/chatRoom/message", sendMessage);
router.get("/chatRoom/messages", getMessages);

export default router;
