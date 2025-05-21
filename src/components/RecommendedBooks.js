import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './RecommendedBooks.css';

const RecommendedBooks = () => {
  const categories = [
    'Story Books',
    'Novels',
    'Science',
    'History',
    'Fiction',
    'Biographies',
    'Literature',
    'Epic or Mythology', // Added Epic or Mythology category
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setBooks([]); // Clear books before fetching new ones

    const categoryMap = {
      'Story Books': 'children',
      'Novels': 'fiction',
      'Science': 'science',
      'History': 'history',
      'Fiction': 'fiction',
      'Biographies': 'biography',
      'Literature': 'literature',
      'Epic or Mythology': 'mythology', // Added Epic or Mythology category
    };

    const query = categoryMap[category] || category;

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=10&startIndex=${startIndex}`);
      const data = await response.json();

      setBooks(data.items || []);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    setLoading(false);
  };

  const handleLoadMore = () => {
    if (books.length < totalItems) {
      setStartIndex(startIndex + 10); // Move to the next set of books
      handleCategorySelect(selectedCategory); // Fetch more books
    }
  };
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };


  return (
    <div className="recommended-books">
      <h1>Recommended Books</h1>

      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className="category-button"
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {selectedCategory && !loading && (
        <div className="book-list-container">
          <h2>{selectedCategory} Category</h2> {/* Fix: Display category without duplicating "Books" */}
          <div className="book-list">
            {books.length === 0 ? (
              <p>No books found for this category.</p>
            ) : (
              books.map((book) => (
                <div key={book.id} className="book-item">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                  <div className="book-details">
                    <h4>{book.volumeInfo.title}</h4>
                    <p>{book.volumeInfo.authors?.join(', ')}</p>
                    <p>{book.volumeInfo.publishedDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {books.length > 0 && books.length < totalItems && (
            <button onClick={handleLoadMore} className="load-more">
              Load More Books
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedBooks;
