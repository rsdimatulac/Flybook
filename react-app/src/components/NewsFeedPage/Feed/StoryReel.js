import React from 'react';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import "./StoryReel.css";

const StoryReel = ({ user }) => {
    const friends = Object.values(user?.friends);
    const friendsPost = friends.map(friend => friend?.posts !== undefined && Object.values(friend?.posts).find(post => (post?.photo_src !== "" && post?.photo_src !== null))).slice(0, 5); // limit to 5 only
    const history = useHistory();
    
    const goToProfile = (friendId) => () => {
        history.push(`/users/${friendId}`);
    };

    return (
        <div className="story__reel">
            {friendsPost?.length > 0 && friendsPost?.map((post, index) =>
                (post === undefined 
                ? "" 
                : <div onClick={goToProfile(friends[index]?.id)} key={friends[index]?.id} className="story" style={{ backgroundImage: `url(${post?.photo_src})` }}>
                    <Avatar src={friends[index]?.profile_src} className="story__avatar"/>
                    <h4>{`${friends[index]?.firstname} ${friends[index]?.lastname}`}</h4>
                </div>)
            )}
        </div>
    )
}

export default StoryReel;
