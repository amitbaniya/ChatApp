import express from "express";
import { findFriends } from "../controllers/friendsController.js";

const router = express.Router();

router.get("/findFriends", findFriends);

export default router;
