import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarRow.css";


const SidebarRow = ({ title, src, Icon }) => {
    return (
        <div className="sidebar__row">
            {src && <Avatar src={src}/>}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default SidebarRow;
