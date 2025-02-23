import express from "express";
import {
  findFriends,
  addFriend,
  getFriends,
} from "../controllers/friendsController.js";

const router = express.Router();

router.get("/findFriends", findFriends);
router.post("/addFriend", addFriend);
router.get("/getFriends", getFriends);

export default router;
