import React from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';

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
                <div className="header__middle">
                    <div className="header__option">
                        <FlagIcon fontSize="large" />
                    </div>
                </div>


            </div>
            <div className="header__right"></div>
        </div>
    );
}

export default Header;