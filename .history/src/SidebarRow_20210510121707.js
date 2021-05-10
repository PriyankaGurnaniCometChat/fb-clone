import React from 'react';

function SidebarRow({ src, Icon, title }) {
    return (
        <div className="sidebarRow">
            <p> {title} </p>
        </div>
    );
};

export default SidebarRow;