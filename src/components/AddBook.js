import React, { useState } from 'react';
import './AddBook.css'; // Import the CSS file for styles

const AddBook = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the new book object
        const newBook = {
            title,
            author,
            genre,
            description,
            price,
            image_url: imageUrl, // Image URL
        };

        try {
            const response = await fetch('http://localhost:5000/api/add-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Book added:', data);
                setTitle('');
                setAuthor('');
                setGenre('');
                setDescription('');
                setPrice('');
                setImageUrl('');
            } else {
                const errorData = await response.json();
                console.error('Error adding book:', errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="add-book-container">
            <h2 className="add-book-title">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-textarea"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="add-book-button">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
