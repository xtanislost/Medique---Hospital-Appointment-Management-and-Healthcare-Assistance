import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  forgotPassword, // Import the new controller
  resetPassword,
  verifyOTP,
  paymentRazorpay,
  verifyRazorpay,     // Import the new controller
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.post('/forgot-password', forgotPassword); // Route to request password reset
userRouter.post('/verify-otp', verifyOTP);
userRouter.post('/reset-password', resetPassword); // Route to reset password with token


userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default userRouter;