import orderModel from "../../models/orderModel.js";

const orderToDeliverController = async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.status = "Delivered";
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
    
  } else {
    return res.status(404).json({ message: "Order not found" });
  }
};

export default orderToDeliverController;
