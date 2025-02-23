import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "default.png" },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
