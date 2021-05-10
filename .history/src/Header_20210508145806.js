import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img src="https://imgur.com/download/VgkNYXI/facebook+logo+png+to+use" alt="logo" />
                <div className="header__input">
                    <SearchIcon />
                    <input type="text" />
                </div>


            </div>
            <div className="header__right"></div>
        </div>
    );
}

export default Header;