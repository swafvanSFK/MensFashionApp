import orderModel from "../../models/orderModel.js";
import productModel from '../../models/productModel.js'

const newOrderController = async (req, res) => {  

  const userId = req.user.data._id  

  const {
    orderItems,
    address,
    city,
    country,
    email,
    postalCode,
    itemsPrice,
    taxPrice,
    totalPrice,
    orderId,
  } = req.body;  

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  // console.log('orderItems===',orderItems);

  for (const item of orderItems){
    const product = await productModel.findById(item.product._id)
    
    if(!product){
      return res.status(404).json({message : "Product not found"})
    }

    if(product.stock < item.qty){
      return res.status(400).json({message : `Not enough stock for ${product.productName}. Only ${product.stock} units left.`})
    }
    

  }
  
  const order = new orderModel({
    user: userId,
    orderItems,
    shippingAddress : {
      address,
      city,
      country, 
      email,
      postalCode,
    },
    paymentMethod : "Bank",
    paymentResult : {
      id : orderId,
      updateTime : new Date()
    },
    isPaid : "true",
    paidAt : new Date(),
    itemsPrice,
    taxPrice,
    totalPrice,
  });

  const createOrder = await order.save();

  for(const item of orderItems){
    const product = await productModel.findById(item.product);
    product.stock -= item.qty;
    await product.save()
  }

  res.status(201).json({success : true, data :createOrder});
};

export default newOrderController;
