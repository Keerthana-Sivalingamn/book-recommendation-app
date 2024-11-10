import React from 'react';
import './MyBooks.css'; // Import your CSS file for styles

const MyBooks = ({ myBooks = [] }) => {
    console.log(JSON.stringify(myBooks, null, 2)); // Log the myBooks array for debugging

    return (
        <div className="my-books-container">
            <h2 className="my-books-title">My Books</h2>
            {myBooks.length === 0 ? (
                <p className="no-books-text">You have not added any books to your wishlist yet.</p>
            ) : (
                <div className="books-container">
                    {myBooks.map((book) => (
                        <div className="book-card" key={book.id}>
                            {book.volumeInfo?.imageLinks?.thumbnail ? (  // Ensure this property path is correct
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail} // Adjusted path for image link
                                    alt={book.volumeInfo.title || 'Untitled'} // Update here
                                    className="book-image"
                                />
                            ) : (
                                <img
                                    src="path/to/placeholder-image.jpg" // Add a placeholder image if thumbnail is missing
                                    alt="Placeholder for a book cover" // Update placeholder alt text
                                    className="book-image"
                                />
                            )}
                            <h3 className="book-title">{book.volumeInfo.title || 'Untitled'}</h3>
                            <p><strong>Author(s):</strong> {book.volumeInfo.authors?.length > 0 ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                            <p><strong>Category:</strong> {book.volumeInfo.categories?.length > 0 ? book.volumeInfo.categories.join(', ') : 'N/A'}</p>
                            <p><strong>Description:</strong> {book.volumeInfo.description || 'No description available.'}</p>
                            {book.saleInfo?.listPrice && (
                                <p><strong>Price:</strong> ${book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooks;
