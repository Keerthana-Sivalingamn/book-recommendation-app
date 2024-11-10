import React from 'react';
import './DropdownMenu.css'; // Import the DropdownMenu CSS

const DropdownMenu = ({ title, children }) => {
    return (
        <div className="dropdown">
            <button className="dropdown-button">
                {title}
            </button>
            <div className="dropdown-content">
                {children}
            </div>
        </div>
    );
};

export default DropdownMenu;
