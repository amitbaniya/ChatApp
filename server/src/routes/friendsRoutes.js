import express from "express";
import {
  findFriends,
  addFriend,
  getFriends,
  getFriend,
} from "../controllers/friendsController.js";

const router = express.Router();

router.get("/findFriends", findFriends);
router.post("/addFriend", addFriend);
router.get("/getFriends", getFriends);
router.get("/getFriend", getFriend);

export default router;
