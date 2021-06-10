import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarRow.css";


const SidebarRow = ({ title, src, Icon, onVideoClick }) => {
    return (
        <div className="sidebar__row" onClick={ onVideoClick ? onVideoClick : null}>
            {src && <Avatar src={src}/>}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default SidebarRow;
