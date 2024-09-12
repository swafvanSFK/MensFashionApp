import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    orderItems: [
      {
        qty: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          require: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: true },
      country: { type: String, require: true },
      email: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true },
    paymentResult: {
      id: { type: String },
      updateTime: { type: String },
      email: { type: String },
    },
    orderStatus : {
      type : String, 
      enum : [ "Shipped", "Delivered", "Canceled","Refunded", "Returned"],
      default : "Shipped"
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true, default: 4 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
