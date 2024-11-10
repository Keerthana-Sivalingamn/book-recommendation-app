import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmitReview.css';


const SubmitReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId;
  console.log(bookId);
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
  console.log(userId);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    // Check if token exists in sessionStorage on component mount
    const token = sessionStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to submit a review.');
      navigate('/login'); // Redirect to login if token is missing
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText || !rating) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const token = sessionStorage.getItem('token'); // Get the JWT token from sessionStorage
    if (!token) {
      setErrorMessage('You must be logged in to submit a review.');
      return; // Don't proceed if token is missing
    }

    try {
      const response = await fetch('http://localhost:5000/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({ bookId, userId, reviewText, rating }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setSuccessMessage('Review submitted successfully!');
        setReviewText('');
        setRating(1);
      }
      else {
        const data = await response.json();
        if (response.status === 401) {
          setErrorMessage('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setErrorMessage(data.message || 'Failed to submit review');
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('Error submitting review. Please try again.');
    }
  };

  return (
    <div>
      <h2>Submit Your Review</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitReview;
