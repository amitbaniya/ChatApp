import express from "express";
import {
  getChatRoom,
  createChatRoom,
  sendMessage,
  getMessages,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/chatRoom", getChatRoom);
router.post("/chatRoom", createChatRoom);
router.post("/chatRoom/message", sendMessage);
router.get("/chatRoom/messages", getMessages);

export default router;
