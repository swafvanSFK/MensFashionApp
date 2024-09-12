import addProductJoi from "../../validations/productJoiValidation.js";
import productModel from '../../models/productModel.js';

const addProductController = async (req, res) => {

  const { error } = addProductJoi.validateAsync(req.body);
  if (error) {
    return res.status(414).send({
      message: error.details[0].message,
    });
  }

    const {
      productName, description, brand, category, price, stock, variants, isFeatured,images, isDiscounted, discountPercentage, discountedPrice
    } = req.body;

    const existingProduct = await productModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).send({ message: "Product name already exists" });
    }

    const newProduct = new productModel({
      productName,
      description,
      brand,
      category,
      price,
      stock,
      images,
      variants,
      isFeatured,
      isDiscounted,
      discountPercentage,
      discountedPrice
    });

    await newProduct.save();
    res.status(201).send({
      message: "Product added successfully",
      success: true,
      data: newProduct
    });
};

export default addProductController;
