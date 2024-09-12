import express from 'express'
import addReviewController from '../controllers/reviewControllers/addReview.js'
import asyncHandler from '../utils/asyncHandler.js'
import gettingAllReviewsController from '../controllers/reviewControllers/getAllReviews.js'
import authUser from '../middlewares/authUser.js'

const reviewRoutes = express.Router()
reviewRoutes.post('/add-review',authUser,asyncHandler(addReviewController))
            .get('/get-reviews/:id',asyncHandler(gettingAllReviewsController))
export default reviewRoutes