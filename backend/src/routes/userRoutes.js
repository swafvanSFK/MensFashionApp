import express from 'express'
import signUpController from '../controllers/userControllers/signUp.js'
import asyncHandler from '../utils/asyncHandler.js'
import signInController from '../controllers/userControllers/signIn.js'
import sendMailController from '../controllers/userControllers/sendEmail.js'
import getAllUsersController from '../controllers/userControllers/getAllUsers.js'
import authUser from '../middlewares/authUser.js'
import getUserByIdController from '../controllers/userControllers/getUserById.js'
import userLogoutController from '../controllers/userControllers/userLogout.js'
import authAdmin from '../middlewares/authAdmin.js'
import checkUserController from '../controllers/userControllers/checkUser.js'
import editUserDetailsController from '../controllers/userControllers/editUserDetails.js'
import editUserRoleController from '../controllers/userControllers/editUserRole.js'
import loginWithGoogle from '../controllers/userControllers/loginWithGoogle.js'
import forgotPasswordController from '../controllers/userControllers/forgotPassword.js'
import protectController from '../controllers/userControllers/protect.js'

const router = express.Router()

router.post('/sign-up',asyncHandler(signUpController))
      .post('/login',asyncHandler(signInController))
      .get('/all-users',authAdmin, asyncHandler(getAllUsersController))
      .get('/current-user',authUser,asyncHandler(getUserByIdController))
      .get('/current-user/:id',authAdmin,asyncHandler(getUserByIdController))
      .post('/sendMail',asyncHandler(sendMailController))
      .get('/logout',asyncHandler(userLogoutController))
      .get('/check-user',authAdmin,asyncHandler(checkUserController))
      .put('/edit-user/:id',authAdmin,asyncHandler(editUserRoleController))
      .put('/edit-user-details',authUser,asyncHandler(editUserDetailsController))
      .post('/login-with-google',asyncHandler(loginWithGoogle))
      .post('/forgot-password',asyncHandler(forgotPasswordController))
      .get('/protect-user',authUser,asyncHandler(protectController))

export default router