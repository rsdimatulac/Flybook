import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NearMeIcon from '@material-ui/icons/NearMe';
import { format } from "date-fns";
import { Avatar } from '@material-ui/core';
import "./Post.css";

const Post = ({ avatar, username, body, image, timestamp }) => {

    return (
        <div className="post">
            <div className="post__top">
                <Avatar className="post__avatar" src={avatar}/>
                <div className="postTop__info">
                    <h3>{username}</h3>
                    <p>{format(new Date(timestamp), "MMM d YYY, hh:mm a")}</p>
                </div>
            </div>
            <div className="post__bottom">
                <p>{body}</p>
            </div>
            <div className="post__image">
                <img src={image} alt="" />
            </div>
            <div className="post__options">
                <div className="post__option">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className="post__option">
                    <ChatBubbleIcon />
                    <p>Comment</p>
                </div>
                <div className="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post;
