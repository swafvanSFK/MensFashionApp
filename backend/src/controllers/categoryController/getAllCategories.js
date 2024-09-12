import productCategoryModel from "../../models/productCategoryModel.js"


const getAllCategoriesController = async (req,res) => {

    const categories = await productCategoryModel.find()
    if(!categories){
     return res.status(400).json({message : "Please add categories first"})
    }
    res.status(200).json(categories)
}

export default getAllCategoriesController