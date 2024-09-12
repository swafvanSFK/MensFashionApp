import mongoose from "mongoose";

// Schema for product reviews
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Main product schema
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
    },
    brand: {
      type: String,
      required: [true, "Brand name is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: 0,
    },
    images: [{ type: String, required: true }],
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [reviewSchema],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    discountedPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.discountPercentage && this.price) {
    this.discountedPrice = Math.floor(
      this.price - (this.price * this.discountPercentage) / 100
    );
    this.isDiscounted = true;
  } else {
    this.discountedPrice = this.price;
    this.isDiscounted = false;
  }
  next();
});

const productModel = mongoose.model("Products", productSchema);
export default productModel;
