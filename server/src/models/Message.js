import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    message: { type: String, default: "" },
    imageUrls: [{ type: String, default: "" }],

    status: {
      type: String,
      enum: ["sending", "sent", "delivered", "seen"],
      default: "sending",
    },

    deliveredAt: { type: Date },
    seenAt: { type: Date },

    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
