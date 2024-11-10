const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: String,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
    maxlength: 1000, // Limit to 1000 characters for review text
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true, // Rating is required between 1 and 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add an index on bookId and userId for faster querying and to prevent duplicate reviews from the same user for the same book
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

// Static method to fetch the average rating for a book
reviewSchema.statics.getAverageRating = async function (bookId) {
  try {
    const result = await this.aggregate([
      { $match: { bookId: mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: '$bookId', averageRating: { $avg: '$rating' } } }
    ]);

    if (result.length === 0) return 0; // If no reviews, return 0
    return result[0].averageRating;
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return 0;
  }
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
