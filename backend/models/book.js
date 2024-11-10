const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Automatically trim extra spaces
  },
  author: {
    type: String,
    required: true,
    trim: true, // Automatically trim extra spaces
  },
  description: {
    type: String,
    maxlength: 2000, // Limit to 2000 characters for description (optional)
  },
  price: {
    type: Number,
    min: 0, // Ensure the price is not negative
  },
  genre: {
    type: String, // Add genre if needed
  },
  publishDate: {
    type: Date,
  },
  ISBN: {
    type: String,
    unique: true, // ISBN should be unique for each book
  },
});

// Add indexes if necessary for performance on title or author
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
