import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import RecommendedBooks from './components/RecommendedBooks';
import MyBooks from './components/MyBooks';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import SubmitReview from './components/SubmitReview'; // Import SubmitReview
import LogoutButton from './components/LogoutButton'; // Import LogoutButton
import AboutPage from "./components/AboutPage";
import BookInfo from './components/BookInfo';

import './App.css';

function App() {
    const [addedBooks, setAddedBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const userId = 1;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsAuthenticated(true);
    }, []);

    const handleAddBook = (book) => {
        if (!addedBooks.some(b => b.id === book.id)) {
            setAddedBooks([...addedBooks, book]);
        } else {
            alert(`${book.title} is already in your My Books list.`);
        }
    };

    const handleSubmitReview = (bookId, reviewText, rating) => {
        const newReview = {
            id: reviews.length + 1,
            userId,
            bookId,
            reviewText,
            rating,
            createdAt: new Date().toISOString(),
        };
        setReviews([...reviews, newReview]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsAuthenticated(false); // Update authentication state
    };

    return (
        <Router>
            <div className="App">
                {/* Navbar */}
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <Link to="/about">About Us</Link>
                        <li><Link to="/my-books">My Books</Link></li>
                        <li><Link to="/recommended">Recommended Books</Link></li>
                        {isAuthenticated && (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated ? 
                            <Navigate to="/home" /> : 
                            <Login setIsAuthenticated={setIsAuthenticated} />
                        } 
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route 
                        path="/home" 
                        element={
                            isAuthenticated ? 
                            <HomePage /> : 
                            <Navigate to="/" />
                        } 
                    />
                    <Route 
                      path="/about" 
                      element={ 
                           isAuthenticated ? <AboutPage /> : <Navigate to="/" /> 
                           }
                       />
                    <Route 
                        path="/books" 
                        element={
                            isAuthenticated ? 
                            <BookList onAddBook={handleAddBook} /> : 
                            <Navigate to="/" />
                        } 
                    />
                    <Route 
                        path="/recommended" 
                        element={
                            isAuthenticated ? 
                            <RecommendedBooks /> : 
                            <Navigate to="/" />
                        } 
                    />
                    <Route 
                      path="/book/:id"  // Updated to match the dynamic book id
                      element={
                      isAuthenticated ? 
                      <BookInfo /> : 
                          <Navigate to="/" />
                       } 
/>

                    
                    <Route 
                        path="/my-books" 
                        element={
                            isAuthenticated ? 
                            <MyBooks myBooks={addedBooks} /> : 
                            <Navigate to="/" />
                        } 
                    />
                    <Route 
                        path="/book-details" 
                        element={
                            isAuthenticated ? 
                            <BookDetails onAddBook={handleAddBook} /> : 
                            <Navigate to="/" />
                        } 
                    />
                    <Route 
                        path="/submit-review" 
                        element={
                            isAuthenticated ? 
                            <SubmitReview onSubmitReview={handleSubmitReview} /> : 
                            <Navigate to="/" />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
