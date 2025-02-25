import express from "express";
import { getChatRoom, createChatRoom } from "../controllers/chatController.js";

const router = express.Router();

router.get("/chatRoom", getChatRoom);
router.post("/chatRoom", createChatRoom);

export default router;
