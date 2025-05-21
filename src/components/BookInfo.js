import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookInfo = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
      setLoading(false);
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return bookDetails ? (
    <div className="book-info-page">
      <img
        src={bookDetails.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={bookDetails.volumeInfo.title}
      />
      <h1>{bookDetails.volumeInfo.title}</h1>
      <h3>{bookDetails.volumeInfo.authors?.join(', ')}</h3>
      <p>{bookDetails.volumeInfo.publishedDate}</p>
      <p>{bookDetails.volumeInfo.description}</p>
    </div>
  ) : (
    <p>Book details not found.</p>
  );
};

export default BookInfo;
