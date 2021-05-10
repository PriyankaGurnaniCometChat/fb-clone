import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img src="https://imgur.com/download/VgkNYXI/facebook+logo+png+to+use" alt="logo" />
                <div className="header__input">
                    <SearchIcon />
                    <input type="text" />
                </div>
                <div className="header__middle">
                    <div className="header__option">
                        <HomeIcon fontSize="large" />
                    </div>
                </div>

            </div>
            <div className="header__right"></div>
        </div>
    );
}

export default Header;