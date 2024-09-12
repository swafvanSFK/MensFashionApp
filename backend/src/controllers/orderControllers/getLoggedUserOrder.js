import orderModel from "../../models/orderModel.js";

const getLoggedUserOrder = async (req, res) => {

  const userId =  req.user.data._id 

  const orders = await orderModel.find({ user: userId }).populate({
    path: 'orderItems.product',
    select: 'productName images brand discountedPrice',
  });
  res.status(200).json(orders);
};

export default getLoggedUserOrder;
