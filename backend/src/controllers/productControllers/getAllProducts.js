import productModel from "../../models/productModel.js";

const getAllProductcontroller = async (req, res) => {
  const {
    page = 1,
    limit = 200,
    sort = "createdAt",
    order = "desc",
  } = req.query;

  const query = {};

  const products = await productModel.find(query)
    .sort({[sort] : order === 'desc' ? -1 : 1})
    .skip((page -1 ) * limit)
    .limit(parseInt(limit))

  const totalProducts = await productModel.countDocuments(query)

  res.status(200).send({
    products,
    totalPages : Math.ceil(totalProducts/limit),
    currentPage : parseInt(page)
  });
};

export default getAllProductcontroller;
