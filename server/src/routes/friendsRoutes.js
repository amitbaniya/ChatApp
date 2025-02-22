import express from "express";
import { findUsers } from "../controllers/friendsController.js";

const router = express.Router();

router.get("/findUsers", findUsers);

export default router;
