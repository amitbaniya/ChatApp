import express from "express";
import { chatPage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", chatPage);

export default router;
