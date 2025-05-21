import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmitReview.css';

const SubmitReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId;

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to submit a review.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText || !rating) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, reviewText, rating }),
      });

      if (response.ok) {
        setSuccessMessage('Review submitted successfully!');
        setErrorMessage('');
        setReviewText('');
        setRating(1);
      } else {
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
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
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
