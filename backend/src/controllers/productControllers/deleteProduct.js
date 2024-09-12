import productModel from "../../models/productModel.js";

const deleteProductController = async (req, res) => {
  const id = req?.params?.id;
  console.log("id===1",id);

  
  const deleteProduct = await productModel.findByIdAndDelete(id);

  if (!deleteProduct) {
    return res.status(400).json({ message: "Product not found" });
  }

  res.status(200).send({
      message: "Product deleted successfully",
      deletedProduct: deleteProduct,
    });
};

export default deleteProductController;
