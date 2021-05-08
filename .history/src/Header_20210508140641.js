import React from 'react';
import "./Header.css";

function Header() {
    return (
        <div className="header">
            <div className="left">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AFacebook_icon.svg&psig=AOvVaw3n2fL1d4A2u7jcxzNhOLUi&ust=1620583393869000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDHmN7VuvACFQAAAAAdAAAAABAO" alt="logo" />
            </div>
            <div className="header_right"></div>
        </div>
    );
}

export default Header;