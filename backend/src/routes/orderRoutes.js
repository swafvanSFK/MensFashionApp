import express from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import newOrderController from '../controllers/orderControllers/newOrder.js'
import orderToDeliverController from '../controllers/orderControllers/orderToDeliver.js'
import getOrderByIdController from '../controllers/orderControllers/getOrderById.js'
import getLoggedUserOrder from '../controllers/orderControllers/getLoggedUserOrder.js'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import {paymentController, verify} from '../controllers/paymentController.js'
import getAllOrdersController from '../controllers/orderControllers/getAllOrders.js'
import orderToCancelController from '../controllers/orderControllers/orderToCancel.js'

const orderRoutes = express.Router()

orderRoutes.post('/new-order',authUser,asyncHandler(newOrderController))
           .get('/order-delivery/:id',authUser,asyncHandler(orderToDeliverController))
           .get('/get-orders/:id',authUser,asyncHandler(getOrderByIdController))
           .get('/user-orders',authUser,asyncHandler(getLoggedUserOrder))
           .get('/get-all-orders',authAdmin,asyncHandler(getAllOrdersController))
           .post('/payment',asyncHandler(paymentController))
           .post('/verify',asyncHandler(verify))
           .get('/cancel-order/:id',authUser,asyncHandler(orderToCancelController))
export default orderRoutes