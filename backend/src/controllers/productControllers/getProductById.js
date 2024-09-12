import productModel from "../../models/productModel.js";

const getProductById = async (req, res) => {
  console.log("hello");
  const id = req.params.id;
  const product = await productModel.findById(id);

  if (!product) {
    return res.status(400).send({ message: "Product not found" });
  } 

  res.status(200).json(product)
};

export default getProductById;
