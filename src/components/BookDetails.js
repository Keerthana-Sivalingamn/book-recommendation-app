import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ onAddBook }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (book) {
      const fetchReviews = async () => {
        try {
          const response = await fetch(`http://localhost:5000/reviews/${book.id}`);
          // console.log(response);
          const data = await response.json();
          console.log(data);
          setReviews(data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
      fetchReviews();
    }
  }, [book]);

  if (!book) return <p>Book details not found.</p>;

  const { title, authors, description, imageLinks, previewLink, saleInfo } = book.volumeInfo || {};
  const id = book.id;
  const price = 
  saleInfo?.saleability === "FOR_SALE" && saleInfo.listPrice?.amount
    ? `$${saleInfo.listPrice.amount}`
    : "Price not available";

  const handleAdd = () => {
    if (onAddBook) onAddBook(book);
  };

  const handleRead = () => {
    if (previewLink) {
      window.open(previewLink, '_blank');
    } else {
      alert('No preview available for this book.');
    }
  };

  const navigateToSubmitReview = () => {
    navigate('/submit-review', { state: { bookId: id } });
  };

  return (
    <div className="book-details-container">
      <div className="book-image-container">
        {imageLinks?.thumbnail ? (
          <img src={imageLinks.thumbnail} alt={title} className="details-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>

      <div className="details-content">
        <h3>{title}</h3>
        <p><strong>Author(s):</strong> {authors?.join(', ') || 'Unknown'}</p>
        <p><strong>Description:</strong> {description || 'No description available.'}</p>
        <p><strong>Price:</strong> {price}</p>

        <div className="button-container">
          <button className="add-button" onClick={handleAdd}>Add to Wishlist</button>
          <button className="comment-button" onClick={navigateToSubmitReview}>Add Review</button>
          <button className="read-button" onClick={handleRead}>Read Preview</button>
        </div>

        <div className="reviews-section">
          <h4>Reviews:</h4>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review">
                <p><strong>{review.userId.username}</strong> {review.reviewText}</p>
                <p>Rating: {review.rating} / 5</p>
                <p><small>{new Date(review.createdAt).toLocaleString()}</small></p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
