import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        qty: { type: Number, required: true,default:1 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
