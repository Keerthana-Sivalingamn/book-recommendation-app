import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Discover, Read, and Be Inspired</h1>
        <p className="hero-subtitle">
          Your gateway to a world of literary adventures.
        </p>
      </section>

      {/* Purpose Image with Text Overlay */}
      <section className="purpose-section">
        <div className="image-overlay-container">
          <img 
            src="https://static01.nyt.com/images/2024/07/12/books/review/1221stCentury-Day5/1221stCentury-Day5-facebookJumbo.jpg" 
            alt="Library or Bookshelf" 
            className="overlay-image" 
          />
          <div className="overlay-text">
            <h2>Our Mission</h2>
            <p>
              we believe that every book has the power to transform lives. Our mission is to connect readers with books that enrich, inspire, and expand their perspectives. From timeless classics to modern masterpieces, we curate a diverse selection of books to ignite your passion for reading.
            </p>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="review-section">
        <h2>What Our Readers Say</h2>
        <blockquote className="review-quote">
          "An amazing platform for discovering books that resonate with the soul. Highly recommended!"
        </blockquote>
        <p className="review-rating">Rating: 4.8/5 from 500+ reviews</p>
      </section>
    </div>
  );
};

export default AboutPage;
