import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots as Options } from "react-icons/bs";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NearMeIcon from '@material-ui/icons/NearMe';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import { format } from "date-fns";
import { Avatar } from '@material-ui/core';
import { editPost, removePost } from "../../../store/posts";
import { getUser } from "../../../store/user"
import useConsumeContext from "../../../context/ModalContext";
import "./Post.css";
import { useHistory } from 'react-router';


const Post = ({ post, user, currentUser }) => {
    const { showEditDeleteOptions, setShowEditDeleteOptions, showEditInput, setShowEditInput } = useConsumeContext();
    const theUser = useSelector(state => state.user);
    const authorUser = theUser[post?.user_id]; // who created the post
    const [thePostID, setThePostID] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [newPostURL, setNewPostURL] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log("DROPDOWN isOPEN?", showEditDeleteOptions);
    // console.log("EDIT INPUT BOX isOPEN?", showEditInput);

    useEffect(() => {
        dispatch(getUser(Number(post?.user_id))) // get the author of the post
    }, [dispatch, post.user_id]);

    const goToProfile = () => {
        history.push(`/users/${post?.user_id}`);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        setThePostID(e.target.parentNode.classList[0]);
        setShowEditDeleteOptions(prevState => !prevState);
    }

    const handleSubmitEditedPost = async (e) => {
        e.preventDefault();
        console.log(thePostID, newPostBody, newPostURL)
        await dispatch(editPost(Number(thePostID), newPostBody, newPostURL));

        setNewPostBody("");
        setNewPostURL("");
        setShowEditInput(false);
    }

    const handleDeleteButton = async (e) => {
        await dispatch(removePost(Number(thePostID)));
        setShowEditDeleteOptions(false);
    };

    const handleCancelButton = () => {
        setShowEditInput(false);
        setShowEditDeleteOptions(false);
    }

    // if post.body and url exists, set it so it could shows the original values
    const postToEdit = (post) => () => {
        setShowEditInput(true);
        setShowEditDeleteOptions(false); // close the options dropdown
        setNewPostBody(post?.body ? post.body : "");
        setNewPostURL(post?.photo_src ? post.photo_src : "");
    }

    const editInputBox = () => { // shows the input box with the original values
        return (
            <div className="editPost__box">
                <form onSubmit={handleSubmitEditedPost}>
                    <input
                        className="editPost__body"
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                        type="text"
                        required
                    />
                    <input
                        type="text"
                        value={newPostURL}
                        onChange={(e) => setNewPostURL(e.target.value)}
                        placeholder="image URL (Optional)"
                    />
                    <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                </form>
                <p>Press Enter key to update your post.</p>
            </div>
        )
    }


    return (
        <>
            <div className="post">
                <div className="post__top">
                    <Avatar className="post__avatar" src={authorUser?.profile_src} onClick={goToProfile}/>
                    <div className="postTop__info">
                        <h3>{`${authorUser?.firstname} ${authorUser?.lastname}`}</h3>
                        <p>{format(new Date(post?.updated_at), "MMM d YYY, hh:mm a")}</p>
                    </div>
                    {/* It will only show when it's the user's post */}
                    {currentUser?.id === post?.user_id &&
                        <div className={`${post?.id} post__optionIcon`} onClick={handleClick}>
                            <Options id="options__icon" />
                        </div>}
                </div>
                {/* This shows the dropdown options for the SPECIFIC post you clicked on */}
                {showEditDeleteOptions && Number(thePostID) === Number(post?.id)
                    && (<div className="options__dropdown">
                        {showEditInput
                            ? <div className="dropdown__editDelete" onClick={handleCancelButton}>
                                <BlockIcon />
                                <p>Cancel</p>
                            </div>
                            : <div className="dropdown__editDelete" onClick={postToEdit(post)}>
                                <EditIcon />
                                <p>Edit</p>
                            </div>}
                        <div className="dropdown__editDelete" onClick={handleDeleteButton}>
                            <DeleteIcon />
                            <p>Delete</p>
                        </div>
                    </div>)
                }
                {/* This shows the input box */}
                {showEditInput && Number(thePostID) === Number(post?.id)
                    ? (editInputBox())
                    : <>
                        <div className="post__bottom">
                            <p>{post?.body}</p>
                        </div>
                        <div className="post__image">
                            <img src={post?.photo_src} alt="" />
                        </div>
                    </>}
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
        </>
    )
}

export default Post;
