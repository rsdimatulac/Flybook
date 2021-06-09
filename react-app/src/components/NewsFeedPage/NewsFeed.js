import React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./Widgets/Widgets";
import "./NewsFeed.css";


const NewsFeed = ({ user }) => {
    return (
        <div className="news__feed">
            <Sidebar user={user}/>
            <Feed user={user}/>
            <Widgets user={user}/>
            {/* Friend Request/Birthdays */}
        </div>
    )
}

export default NewsFeed;
