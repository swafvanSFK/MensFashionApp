import express from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import addProductCategoryController from '../controllers/categoryController/addProductCategories.js'
import getAllCategoriesController from '../controllers/categoryController/getAllCategories.js'
import getCategoryByIdController from '../controllers/categoryController/getCategoryById.js'

const categoryRoutes = express.Router()

categoryRoutes.post('/add-category',asyncHandler(addProductCategoryController))
              .get('/get-all-categories',asyncHandler(getAllCategoriesController))
              .get('/get-category-by-id',asyncHandler(getCategoryByIdController))

export default categoryRoutes