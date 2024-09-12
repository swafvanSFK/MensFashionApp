import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String }
});

productCategorySchema.pre('save', function (next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  next();
});

const productCategoryModel = mongoose.model("Category",productCategorySchema)
export default productCategoryModel;
