import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfilePicture } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/profile", upload.single("profilePicture"), uploadProfilePicture);

export default router;
