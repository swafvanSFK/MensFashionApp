import orderModel from "../../models/orderModel.js";

const getOrderByIdController = async (req, res) => {

  const order = await orderModel.findById(req.params.id)

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
  
};

export default getOrderByIdController;
