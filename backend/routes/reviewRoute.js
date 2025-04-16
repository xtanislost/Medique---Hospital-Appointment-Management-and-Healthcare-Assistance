import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authUser from '../middlewares/authUser.js';

const reviewRouter = express.Router();

// Patient can submit a review for a specific doctor
reviewRouter.post('/doctors/:doctorId/reviews', authUser, reviewController.createReview);

// Get all reviews for a specific doctor
reviewRouter.get('/doctors/:doctorId/reviews', reviewController.getDoctorReviews);

// Optional: Get all reviews by the authenticated patient
reviewRouter.get('/patients/reviews', authUser, reviewController.getPatientReviews);

// Optional: Update a specific review by the authenticated patient
reviewRouter.put('/reviews/:reviewId', authUser, reviewController.updateReview);

// Optional: Delete a specific review by the authenticated patient
reviewRouter.delete('/reviews/:reviewId', authUser, reviewController.deleteReview);

export default reviewRouter;
