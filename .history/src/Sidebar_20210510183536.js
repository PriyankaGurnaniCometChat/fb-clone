import React from 'react';
import "./Sidebar.css"
import SidebarRow from "./SidebarRow";


function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarRow src="https://pbs.twimg.com/profile_images/1293587300669108231/09g3ENV9_400x400.jpg" title="Randy Steele" />
            <SidebarRow title="Friends" />
            <SidebarRow />
            <SidebarRow />
            <SidebarRow />
            <SidebarRow />
            <SidebarRow />

        </div>
    );
};

export default Sidebar;