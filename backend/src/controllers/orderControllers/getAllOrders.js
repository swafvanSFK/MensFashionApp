import orderModel from '../../models/orderModel.js'

const getAllOrdersController = async (req, res) => {

    const allOrders = await orderModel.find().populate({
        path : "orderItems.product",
        select: 'productName images brand discountedPrice',
    })

    if (!allOrders) {
        return res.status(400).json({message : "No orders found"})
    }

    res.status(200).json(allOrders)

}

export default getAllOrdersController