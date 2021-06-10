import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarRow.css";


const SidebarRow = ({ title, src, Icon, onVideoClick, onFriendsClick }) => {
    return (
        <div className="sidebar__row" onClick={ onVideoClick ? onVideoClick : onFriendsClick}>
            {src && <Avatar src={src}/>}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default SidebarRow;
