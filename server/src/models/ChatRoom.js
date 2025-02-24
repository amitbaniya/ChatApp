import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groupName: { type: String, default: "" },
    groupPicture: { type: String, default: "" },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export default mongoose.model("ChatRoom", ChatRoomSchema);
