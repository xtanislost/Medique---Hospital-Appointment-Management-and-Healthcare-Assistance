// ./controllers/reviewController.js

import reviewModel from "../models/reviewModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

const reviewController = {
  async createReview(req, res) {
    try {
      const { doctorId } = req.params;
      const { rating, reviewText } = req.body;
      const patientId = req.body.userId; // Extracted by authUser middleware

      // Validate inputs
      if (!rating || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a valid rating (1-5)." });
      }

      // Check if the doctor exists
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return res
          .status(404)
          .json({ success: false, message: "Doctor not found." });
      }

      // Check if the patient exists (optional, but good practice)
      const patient = await userModel.findById(patientId);
      if (!patient) {
        return res
          .status(404)
          .json({ success: false, message: "Patient not found." });
      }

      // Prevent a patient from submitting multiple reviews for the same doctor (optional)
      const existingReview = await reviewModel.findOne({
        patient: patientId,
        doctor: doctorId,
      });

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this doctor.",
        });
      }

      const newReview = new reviewModel({
        patient: patientId,
        doctor: doctorId,
        rating,
        reviewText,
      });

      const savedReview = await newReview.save();

      res.status(201).json({
        success: true,
        message: "Review submitted successfully.",
        review: savedReview,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getDoctorReviews(req, res) {
    try {
      const { doctorId } = req.params;

      // Check if the doctor exists (optional, but good practice)
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return res
          .status(404)
          .json({ success: false, message: "Doctor not found." });
      }

      const reviews = await reviewModel
        .find({ doctor: doctorId })
        .populate("patient", "name image"); // Populate patient details (optional)

      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error("Error fetching doctor reviews:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Optional: Get reviews by patient
  async getPatientReviews(req, res) {
    try {
      const patientId = req.body.userId; // Extracted by authUser middleware

      const reviews = await reviewModel.find({ patient: patientId }).populate("doctor", "name speciality image"); // Populate doctor details using 'speciality'

      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error("Error fetching patient reviews:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Optional: Update review
  async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { rating, reviewText } = req.body;
      const patientId = req.body.userId;

      const review = await reviewModel.findById(reviewId);
      if (!review) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found." });
      }

      // Ensure the requesting user is the author of the review
      if (review.patient.toString() !== patientId) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized to update this review." });
      }

      if (rating && (rating < 1 || rating > 5)) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a valid rating (1-5)." });
      }

      const updatedReview = await reviewModel.findByIdAndUpdate(
        reviewId,
        { rating, reviewText },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review updated successfully.",
        review: updatedReview,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Optional: Delete review
  async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;
      const patientId = req.body.userId;

      const review = await reviewModel.findById(reviewId);
      if (!review) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found." });
      }

      // Ensure the requesting user is the author of the review
      if (review.patient.toString() !== patientId) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized to delete this review." });
      }

      await reviewModel.findByIdAndDelete(reviewId);

      res
        .status(200)
        .json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};


export default reviewController;
