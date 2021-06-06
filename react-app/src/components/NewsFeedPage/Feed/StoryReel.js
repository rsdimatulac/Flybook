import { Avatar } from '@material-ui/core';
import React from 'react';
import "./StoryReel.css"

const StoryReel = ({ user }) => {
    const friends = Object.values(user?.friends);
    const friendsPost = friends.map(friend => Object.values(friend.posts).find(post => (post.photo_src !== "")));

    return (
        <div className="story__reel">
            {/* MAP FRIENDS */}
            {friends && friends.map(friend =>
                (<div key={friend.id} className="story" style={{ backgroundImage: friendsPost[0]?.photo_src ? `url(${friendsPost[0]?.photo_src})` : `url(https://theflybook.s3.amazonaws.com/posts/ren_1.jpg)` }}>
                    <Avatar src={friend.profile_src} className="story__avatar"/>
                    <h4>{`${friend.firstname} ${friend.lastname}`}</h4>
                </div>)
            )}
            {/* <div className="story" style={{ backgroundImage: friendsPost[0]?.photo_src ? `url(${friendsPost[0]?.photo_src})` : `url(https://theflybook.s3.amazonaws.com/posts/ren_1.jpg)` }}>
                <Avatar src={friends[0].profile_src} className="story__avatar" />
                <h4>{`${friends[0].firstname} ${friends[0].lastname}`}</h4>
            </div> */}
        </div>
    )
}

export default StoryReel;
