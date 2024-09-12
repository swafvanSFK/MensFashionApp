import productModel from "../../models/productModel.js";

const addReviewController = async (req, res) => {

    const {productId, comment , rating} = req.body;
    const userId = req.user.data._id

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({message : "Product not found"})
    }

    const review = {
        user : userId,
        rating : Number(rating),
        comment,
    }
    
    product.reviews.push(review);
    product.ratings.count = product.reviews.length;
    product.ratings.average = product.reviews.reduce((acc, review) => acc + review.rating, 0) /product.reviews.length;
    await product.save()
    res.status(201).json({ message: "Review added", review ,success : true});
}

export default addReviewController