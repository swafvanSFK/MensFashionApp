import productModel from "../../models/productModel.js"

const updateProductController = async (req, res) => {

    const {id} = req.params
    const {updatedData} = req.body

    const updatedProduct = await productModel.findByIdAndUpdate(id,updatedData,{new:true})

    if(!updatedProduct){
        return res.status(400).send({message : "Product not found"})
    }

    res.status(200).send({message : 'Product updated successfully', data : updatedProduct,success: true})
    
}

export default updateProductController