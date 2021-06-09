import { Avatar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import "./StoryReel.css"

const StoryReel = ({ user }) => {
    const friends = Object.values(user?.friends).slice(0, 5);
    const friendsPost = friends.map(friend => Object.values(friend.posts).find(post => (post.photo_src !== "" && post.photo_src !== null))); // limit to 5 only
    const history = useHistory();
    console.log("FriendsPost", friendsPost)
    const goToProfile = (friendId) => () => {
        history.push(`/users/${friendId}`);
    };

    return (
        <div className="story__reel">
            {/* MAP FRIENDS */}
            {friends && friends.map((friend, index) =>
                (<div onClick={goToProfile(friend?.id)} key={friend.id} className="story" style={{ backgroundImage: `url(${friendsPost[index]?.photo_src})` }}>
                    <Avatar src={friend.profile_src} className="story__avatar"/>
                    <h4>{`${friend.firstname} ${friend.lastname}`}</h4>
                </div>)
            )}
        </div>
    )
}

export default StoryReel;
