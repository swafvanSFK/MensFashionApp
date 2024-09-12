import productCategoryModel from "../../models/productCategoryModel.js"

const getCategoryByIdController = async (req,res) => {
    const id = req.body
    console.log(id);
    
    if(!id) {
        return res.json({message : "Id not available"})
    }
    const category = await productCategoryModel.findById(id)
    res.status(200).json(category)
}   

export default getCategoryByIdController