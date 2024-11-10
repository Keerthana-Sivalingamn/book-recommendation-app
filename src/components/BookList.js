import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = ({ onAddBook, userId }) => {  // Ensure userId is passed as a prop
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const fetchBooks = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            console.log('Books:', data.items);
            setBooks(data.items || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchBooks = useCallback(
        debounce((query) => {
            fetchBooks(query);
        }, 500),
        []  // This makes sure debouncedFetchBooks is created once and doesn't change on every render
    );

    useEffect(() => {
        if (searchTerm) {
            debouncedFetchBooks(searchTerm);
        } else {
            setBooks([]); // Clear books if no search term is present
        }

        return () => {
            debouncedFetchBooks.cancel(); // Clean up debounce on unmount
        };
    }, [searchTerm, debouncedFetchBooks]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleBookClick = (book) => {
        navigate('/book-details', { state: { book, userId } });  // Pass both book and userId
    };

    return (
        <div className="book-list-container">
            <h2 className="book-list-title">Book List</h2>
            <input
                type="text"
                placeholder="Search for books by title or author..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            {loading ? (
                <p className="loading-text">Loading books...</p>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : books.length === 0 ? (
                <p className="no-books-text">No books available.</p>
            ) : (
                <div className="books-container">
                    {books.map((book) => (
                        <div
                            className="book-card"
                            key={book.id}
                            onClick={() => handleBookClick(book)} // Navigate to details on click
                            style={{ cursor: 'pointer' }} // Ensure the cursor indicates clickable items
                        >
                            {book.volumeInfo?.imageLinks?.thumbnail ? (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    className="book-image"
                                />
                            ) : (
                                <div className="placeholder-image">No Image</div>
                            )}
                            <h3 className="book-title">{book.volumeInfo.title}</h3>
                            <p className="book-author">
                                {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookList;
