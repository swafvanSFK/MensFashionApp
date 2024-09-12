import addProductCategoryJoi from "../../validations/addProductCategoryJoiValidation.js"
import productCategoryModel from '../../models/productCategoryModel.js'

const addProductCategoryController = async (req, res) => {
    const {error} = addProductCategoryJoi.validateAsync(req.body)
    if(error) {
        return res.status(414).send({
            message: error.details[0].message,
        })
    }

    const {category,description} =  req.body

    const isExist = await productCategoryModel.findOne({category})
 
    if (isExist) {
        return res.status(400).send({
            message : `${category} already exist`
        })
    }

    const newCategory = new productCategoryModel({
        category,
        description
    })

    await newCategory.save()

    res.status(201).send({
        success : true,
        message : "Category created succesfully",
        category : newCategory
    })
}

export default addProductCategoryController