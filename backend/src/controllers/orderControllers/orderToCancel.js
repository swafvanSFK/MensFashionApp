import orderModel from "../../models/orderModel.js";

const orderToCancelController = async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.orderStatus = "Canceled";
    order.canceledAt = Date.now()
    const updateOrder = await order.save();
    res.status(200).json({message : "Order Canceled", success : true ,updateOrder});
    
  } else {
    res.status(404).json({ message: "Order not found"});
  }
};

export default orderToCancelController;
