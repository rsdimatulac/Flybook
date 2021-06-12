import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getUser } from "../../../store/user";
import { Avatar } from '@material-ui/core';
import { FaTrash as DeleteIcon } from "react-icons/fa";
import { MdEdit as EditIcon } from "react-icons/md";
import { TiCancel as CancelIcon } from "react-icons/ti";
import { format } from "date-fns";
import { createCommentLike, removeLike, getAllLikes } from "../../../store/likes";
import { editComment, removeComment } from "../../../store/comments";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import "./Comment.css";


const Comment = ({ comment, currentUser }) => {
    const theUser = useSelector(state => state.user);
    const commentLikes = useSelector(state => state.likes);
    const likes = Object.values(commentLikes)?.filter(like => like?.like_type === "comment" && like?.comment_id === comment?.id)
    const authorUser = theUser[comment?.user_id];
    const [newCommentBody, setNewCommentBody] = useState("");
    const [showCommentLike, setShowCommentLike] = useState(false);
    const [showEditCommentInput, setShowEditCommentInput] = useState(false);
    const isCommentLiked = likes?.some(like => like.user_id === currentUser.id); // if post is liked by the currentUser
    const like = likes?.find(like => like.user_id === currentUser.id); // if post is liked by the currentUser
    const dispatch = useDispatch();
    const history = useHistory();

    const goToProfile = () => {
        history.push(`/users/${comment?.user_id}`);
    };

    useEffect(() => {
        if (isCommentLiked) {
            setShowCommentLike(true);
        } else {
            setShowCommentLike(false);
        }
        dispatch(getAllLikes())
        dispatch(getUser(Number(comment?.user_id))); // get the author of the post
    }, [dispatch, comment.user_id, isCommentLiked]);

    const handleCommentLike = (comment) => async (e) => {
        if (showCommentLike) { // if the post is liked
            // remove the like
            await dispatch(removeLike(like?.id));
            setShowCommentLike(false);
        } else { // if not liked
            // add the like
            await dispatch(createCommentLike(comment?.id));
            setShowCommentLike(true);
        }
    }

    const commentToEdit = (comment) => () => {
        setShowEditCommentInput(true);
        setNewCommentBody(comment?.body ? comment?.body : "");
    }

    const handleSubmitEditedComment = async (e) => {
        e.preventDefault();
        await dispatch(editComment(comment?.id, newCommentBody))
        setNewCommentBody("");
        setShowEditCommentInput(false);
    }

    const handleDeleteComment = async () => {
        await dispatch(removeComment(comment?.id))
    }

    const userCommentOptions = () => {
        return (
            <div className="comment__editDelete">
                {showEditCommentInput ?
                    <>
                        <div onClick={() => setShowEditCommentInput(prevState => !prevState)}><CancelIcon style={{ marginRight: 2 }}/><span>Cancel</span></div>
                        <div onClick={handleDeleteComment}><DeleteIcon style={{ fontSize: 10, marginRight: 2 }}/><span>Delete</span></div>
                    </> :
                    <>
                        <div onClick={commentToEdit(comment)}><EditIcon style={{ marginRight: 2 }}/><span>Edit</span></div>
                        <div onClick={handleDeleteComment}><DeleteIcon style={{ fontSize: 10, marginRight: 2 }}/><span>Delete</span></div>
                    </>
                }
            </div>
        )
    }

    return (
        <div className="each__comment">
            <Avatar className="comment__avatar" src={authorUser?.profile_src} onClick={goToProfile} />
            <div className="comment__topInfo">
                <div className={`${comment?.id} comment__name`}>
                    <div>
                        <h3 onClick={goToProfile}>{authorUser?.firstname} {authorUser?.lastname}</h3>
                        {currentUser?.id === authorUser?.id && userCommentOptions()}
                    </div>
                    {showEditCommentInput
                        ? <div className="comment__editInput">
                            <form onSubmit={handleSubmitEditedComment}>
                                <input
                                    required
                                    value={newCommentBody}
                                    onChange={(e) => setNewCommentBody(e.target.value)}
                                    placeholder="Update your comment"
                                />
                                <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                            </form>
                            <p>Press Enter key to update your comment.</p>
                          </div>
                        : <h4>{comment?.body}</h4>
                    }
                    {likes?.length > 0 && <div className="likeComment__icon"><ThumbUpIcon /> <p>{likes?.length}</p></div>}
                </div>
                <div className="comment__bottomInfo">
                    <div className="likeComment__button" onClick={handleCommentLike(comment)} style={{ color: showCommentLike ? "#2e81f4" : "inherit" }}>Like</div>・
                    <p>{format(new Date(comment?.updated_at), "MMM d, YYY, hh:mm a")}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;
