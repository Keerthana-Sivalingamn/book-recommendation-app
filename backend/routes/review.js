const express = require('express');
const Review = require('../models/Review');
const authenticate = require('../middleware/authMiddleware'); // Assuming you have the middleware in a separate file
const router = express.Router();

// Add a review for a book
router.post('/add', authenticate, async (req, res) => {
  try {
    const { bookId, reviewText, rating } = req.body;
    const userId = req.user.userId;// Get userId from the authenticated user
    console.log(userId);

    // Validate the incoming data
    if (!bookId || !reviewText || !rating) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    // Create a new review
    const newReview = new Review({
      bookId,
      userId,
      reviewText,
      rating,
    });

    // Save the review in the database
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding review', error });
  }
});

module.exports = router;
