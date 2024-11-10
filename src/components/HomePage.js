// src/components/HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="banner">
                <img src="https://thumbs.dreamstime.com/b/library-books-background-book-closet-filled-41199253.jpg" alt="Banner" className="banner-image" />
                <div className="banner-content">
                    <h1>Welcome to Book Recommendation App</h1>
                    <p>Your gateway to amazing books and personalized recommendations.</p>
                    <button className="explore-button">Explore Now</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
