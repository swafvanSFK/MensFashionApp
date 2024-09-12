import cartModel from '../../models/cartModel.js'

const deleteAllCartItemsController = async (req,res) => {

    const id = req.params.id;    

    if(!id){
        return res.status(400).json({message : "ID is required"})
    }

    const deletedCart = await cartModel.findByIdAndDelete(id)

    res.status(200).json({message : "Cleared cart items",data : deletedCart,success : true})

}

export default deleteAllCartItemsController