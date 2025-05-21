const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Fetch environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://keerthana:Keerthana28@cluster0.p3jjw.mongodb.net/BookRecommendation?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "L7UMHK8DWJEbdPEzql2NS2TS5mnv8kzb4BFZQhGxj0I=";

// Check if environment variables are available
if (!MONGO_URI || !JWT_SECRET) {
  console.error("Missing required environment variables");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import Models
const User = require('./models/User');
const Book = require('./models/book');
const Review = require('./models/Review');

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Signup Route
app.post('/signup', async (req, res) => {
  const { username,email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username,email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  console.log(req.body); 
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("Generated token:", token);
    res.cookie('auth_token', token, {
      httpOnly: true,  // Cookie can't be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production (use HTTPS)
      sameSite: 'Strict', // Controls cookie cross-site sending behavior
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Add a Review for a Book
app.post('/reviews/add', authenticateToken, async (req, res) => {
  const { bookId, reviewText, rating } = req.body;
  console.log(bookId);
  const userId = req.user.userId; // Assuming your JWT payload contains _id as the user identifier

  console.log(userId);
  if (!bookId || !reviewText || !rating) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newReview = new Review({
      bookId,
      userId,
      reviewText,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding review', error });
  }
});

// Fetch Reviews for a Book
app.get('/reviews/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ bookId }).populate('userId', 'email');
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

// Fetch All Books (Optional)
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
