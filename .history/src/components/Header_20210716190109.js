import React, { useState } from 'react';
import "../styles/Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function Header() {
    const [{ user }] = useState(false);

    return (
        <div className="header">
            <div className="header__left">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAaVBMVEUXd/L///+fxvrE3Pzg7f3R5Px0rffA2vsYePGTwPkmgPMdevFlpfbn8f4vhfJjo/Y7i/NXnPY9jvPU5v0efPGz0/vN4vxHlPVqqPdbn/b0+f671/t6sfgsgvJQmfTb6v2Lu/ipzPqPvflxbKC3AAACc0lEQVR4nO3b23KCMBAG4AUDRQ4iKIi09vT+D1mwpaWUIM1mNzPt7pUXzvyfGQwhYcH7LOXn+xjIKy5TX32lwvChLiL68KGiIpgAspQx/kpIszHgsOON7+tSfwGqhD8fIKkGQOAkvxPU74Ds4iYfYJddAamrfIC0B9TM1/+4oqADFO7yAQoPlMMB6IZAge8yH7r43C0ghb1bQAlHt4AYSGbByylvwjBM8+KxXL7N2I9PzttN632r7HDvP5z3HGMdFdUkfFQhfX7zpE3nAJwOS/HkgOh5OZ4aEG9u5dMCdjeGnxpwXJFPCUhujz8t4HVNPiHgtCqfDhAFt8NJAc26fDrA4vzLAChW5pMBKseAo/7+ywM4r82nAvhLmW1w/7Id6kQDqPXxVc6wCou0l0BA9IsnVeryNwz7XX3pZgHFtekRagA849+VZiW44crXLQUaNsB2HsC37Tc/D2Vs+RrAwTWA7xoUgAAEIAABCIAb8KKmNb8qb398T6kHG4C72bh1ZeVsDAOwsk7GAKw8KCAAdpaJCMCda4Cd0zkEwMq/EAOwc0CLANh5VjIHtFbyEQBLz0rmgMo14Nk1wNKGgTmgdA2wtGNoDLC1Y2EMsLVGMwbYelHED6aVzea106/R7Zr9t2W5AAQgAAEIQAACEIAABCAAAQhAAH8SgDzIwAISbIsHFhADcgMPCygBeZqGBaTYRicswAflFpBhm92QgMIDL3AIuLb74Q51cYDmveUTc56EAny0fKKaXjGAoenV8yrz6RABOH62/WIan80Bu1HjM6L12xjQfGv97i8Es/nAEPCj+b0v5aflr1+H/j2gb/8fnTK8AQb/HoVuNA2gAAAAAElFTkSuQmCC" alt="logo" />
                <div className="header__input">
                    <SearchIcon />
                    <input placeholder="Search Facebook" type="text" />
                </div>
                <div className="header__center">
                    <div className="header__option
                    header__option--active">
                        <HomeIcon fontSize="large" />
                    </div>
                </div>
                <div className="header__middle">
                    <div className="header__option">
                        <FlagIcon fontSize="large" />
                    </div>
                </div>
                <div className="header__middle">
                    <div className="header__option">
                        <SubscriptionsOutlinedIcon fontSize="large" />
                    </div>
                </div>

                <div className="header__middle">
                    <div className="header__option">
                        <StorefrontOutlinedIcon fontSize="large" />
                    </div>
                </div>

                <div className="header__middle">
                    <div className="header__option">
                        <SupervisedUserCircleRoundedIcon fontSize="large" />
                    </div>
                </div>


            </div>
            <div className="header__right"></div>
            <div className="header__info">
                <Avatar src={user?.photoURL} />
                <h4>{user?.displayName}</h4>
            </div>
            <IconButton>
                <AddIcon />
            </IconButton>
            <IconButton>
                <ForumIcon />
            </IconButton>
            <IconButton>
                <NotificationsActiveIcon />
            </IconButton>
            <IconButton>
                <ExpandMoreIcon />
            </IconButton>
        </div>
    );
}

export default Header;