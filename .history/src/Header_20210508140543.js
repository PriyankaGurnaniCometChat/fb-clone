import React from 'react';
import "./Header.css";

function Header() {
    return (
        <div className="header">
            <div className="left">
                <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2021%2F04%2FFacebook-logo.png&imgrefurl=https%3A%2F%2F1000logos.net%2Ffacebook-logo%2F&tbnid=rapgFoKSL6RhiM&vet=12ahUKEwi4urfd1brwAhUTB6wKHXJfB6kQMygAegUIARDTAQ..i&docid=ru3aYtGX_RZZDM&w=4000&h=2500&q=facebook%20logo&ved=2ahUKEwi4urfd1brwAhUTB6wKHXJfB6kQMygAegUIARDTAQ" alt="logo" />
            </div>
            <div className="header_right"></div>
        </div>
    );
}

export default Header;