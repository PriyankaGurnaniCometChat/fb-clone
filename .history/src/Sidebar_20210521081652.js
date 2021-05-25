import { ExpandMoreOutlined, VideoLibrary } from '@material-ui/icons';
import React from 'react';
import "./Sidebar.css"
import SidebarRow from "./SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { useStateValue } from "./StateProvider";
import { Link, Router } from 'react-router-dom'
import { CometChat } from '@cometchat-pro/chat';
import CometChatUI from "@cometchat-pro/chat"




function Sidebar() {
    const [{ user }, dispatch] = useStateValue();
    return (
        <div className="sidebar">
            <Router>
                <SidebarRow src={user.photoURL} title={user.displayName} />
                <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
                <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
                <SidebarRow Icon={PeopleIcon} title="Friends" />
                <SidebarRow Icon={ChatIcon} title="Inbox" />
                {/* <Link to={CometChatUI}></Link> */}
                <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
                <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
                <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" />
            </Router>


        </div>
    );
};

export default Sidebar;