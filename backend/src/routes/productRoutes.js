import express from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import addProductController from '../controllers/productControllers/addProduct.js'
import getAllProductcontroller from '../controllers/productControllers/getAllProducts.js'
import getProductById from '../controllers/productControllers/getProductById.js'
import updateProductController from '../controllers/productControllers/updateProduct.js'
import deleteProductController from '../controllers/productControllers/deleteProduct.js'
import authAdmin from '../middlewares/authAdmin.js'
import deleteImageController from '../controllers/productControllers/deleteImage.js'

const router = express.Router()

router.post('/add-product',authAdmin,asyncHandler(addProductController))
      .get('/all-products',asyncHandler(getAllProductcontroller))
      .get('/get-product-id/:id',asyncHandler(getProductById))
      .put('/update-product/:id',authAdmin,asyncHandler(updateProductController))
      .delete('/delete-product/:id',authAdmin,asyncHandler(deleteProductController))
      .post('/delete-image',authAdmin,deleteImageController)

export default router