import React from 'react';
import "./Header.css";

function Header() {
    return (
        <div className="header">
            <div className="left">
                <img src="https://upload.wikimedia.org/widipedia/commons/thumb/5/51/Facebook_f_logo_%2820919%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="logo" />
            </div>
            <div className="header_right"></div>
        </div>
    );
}

export default Header;