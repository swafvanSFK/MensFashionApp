import cartModel from "../../models/cartModel.js"

const getCartItemsController = async (req, res) => {
    const cart = await cartModel.findOne({ user : req.user.data._id}).populate('cartItems.product','productName price images')

    if (cart) {
        res.status(200).json(cart)
    }else {
        res.status(400).json({message : "Cart not found"})
    }
}

export default getCartItemsController