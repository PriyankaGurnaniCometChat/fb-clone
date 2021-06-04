import { ExpandMoreOutlined } from '@material-ui/icons';
import React from 'react';
import ".styles/Sidebar.css"
import SidebarRow from "./components/SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { useStateValue } from "./adapters/StateProvider";
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import CometChatUI from "@cometchat-pro/chat"




function Sidebar() {
    const [{ user }] = useStateValue();

    return (
        <div className="sidebar">

            <SidebarRow src={user.photoURL} title={user.displayName} />
            <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
            <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
            <SidebarRow Icon={PeopleIcon} title="Friends" />
            <Router><SidebarRow Icon={ChatIcon} title="Messenger" /></Router>
            <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
            <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
            <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" />



        </div>
    );
};

export default Sidebar;