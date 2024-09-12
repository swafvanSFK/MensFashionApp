import productModel from "../../models/productModel.js"

const gettingAllReviewsController = async (req, res) => {

    const productId = req.params.id;    
    
    const product = await productModel.findById(productId).populate({
        path:"reviews.user",
        select : "userName"
    });

    if(!product){
        return res.status(400).json({message : "Product not found"})
    }

    res.status(200).json(product);
}

export default gettingAllReviewsController