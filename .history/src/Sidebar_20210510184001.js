import { ExpandMoreOutlined, VideoLibrary } from '@material-ui/icons';
import React from 'react';
import "./Sidebar.css"
import SidebarRow from "./SidebarRow";


function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarRow src="https://pbs.twimg.com/profile_images/1293587300669108231/09g3ENV9_400x400.jpg" title="Randy Steele" />
            <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
            <SidebarRow Icon={EmojiFlagsIcon} title={pages} />
            <SidebarRow Icon={PeopleIcon} title="Friends" />
            <SidebarRow Icon={ChatIcon} title="Messenger" />
            <SidebarRow Icon={StoreFrontIcon} title="Marketplace" />
            <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
            <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" />


        </div>
    );
};

export default Sidebar;