import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { getUser } from "../../../store/user";
import { Avatar } from '@material-ui/core';
import { format } from "date-fns";
import "./Comment.css";


const Comment = ({ comment }) => {
    const theUser = useSelector(state => state.user);
    const authorUser = theUser[comment?.user_id];
    const dispatch = useDispatch();
    const history = useHistory();

    const goToProfile = () => {
        history.push(`/users/${comment?.user_id}`);
    };

    useEffect(() => {
        dispatch(getUser(Number(comment?.user_id))) // get the author of the post
    }, [dispatch, comment.user_id]);

    return (
        <div className="each__comment">
            <Avatar className="comment__avatar" src={authorUser?.profile_src} onClick={goToProfile}/>
            <div className="comment__topInfo">
                <div className="comment__name">
                    <h3 onClick={goToProfile}>{authorUser?.firstname} {authorUser?.lastname}</h3>
                    <h4>{comment?.body}</h4>
                </div>
                <div className="comment__bottomInfo">
                    <div>Like</div>・
                    <p>{format(new Date(comment?.updated_at), "MMM d YYY, hh:mm a")}</p>
                    {/* <div><ThumbUpIcon fontSize="small" /></div> */}
                </div>
            </div>
        </div>
    )
}

export default Comment;
