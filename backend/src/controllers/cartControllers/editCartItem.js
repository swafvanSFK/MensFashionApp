import cartModel from '../../models/cartModel.js'

const editCartItemController = async (req,res) => {

  const { userId, productId, newQty } = req.body

    const updatedCart = await cartModel.updateOne(
      { user: userId, "cartItems.product": productId },
      { $set: { "cartItems.$.qty": newQty } } 
    );

      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      
      res.status(200).json({ message: 'Cart item updated', updatedCart });
}

export default editCartItemController