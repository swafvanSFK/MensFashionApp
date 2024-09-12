import cartModel from "../../models/cartModel.js"

const removeCartItemsController = async (req, res) => {
    const {id} = req.params
    console.log("new id ==",id);
    
    const cart = await cartModel.findOne({user : req.user.data._id})

    if (cart) {
        cart.cartItems = cart.cartItems.filter((item) => item.product.toString() !== id);
        await cart.save()
        res.status(200).json(cart)
    }else {
        res.status(404).json({message : "Cart not found"})
    }
}

export default removeCartItemsController