import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email!"],
    },
    password: {
      type: String,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["GENERAL", "ADMIN"],
      default: "GENERAL",
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    DOB: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
