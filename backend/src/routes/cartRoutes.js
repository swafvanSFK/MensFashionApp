import express from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import addToCartController from '../controllers/cartControllers/addToCart.js'
import getCartItemsController from '../controllers/cartControllers/getCartItems.js'
import removeCartItemsController from '../controllers/cartControllers/removeCartItems.js'
import authUser from '../middlewares/authUser.js'
import deleteAllCartItemsController from '../controllers/cartControllers/deleteAllCartItems.js'
import editCartItemController from '../controllers/cartControllers/editCartItem.js'

const cartRoutes = express.Router()

cartRoutes.post('/add-to-cart',authUser, asyncHandler(addToCartController))
          .get('/get-cart-items',authUser,asyncHandler(getCartItemsController))
          .put('/edit-cart',authUser,asyncHandler(editCartItemController))
          .delete('/remove-cart-item/:id',authUser,asyncHandler(removeCartItemsController))
          .delete('/clear-cart/:id',asyncHandler(deleteAllCartItemsController))

export default cartRoutes