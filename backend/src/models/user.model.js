import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: true },
    profilePic: { type: String, required: true, minLength: 6 },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
