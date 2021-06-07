import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import { getAllUsers } from "../../../store/users";
import { BsThreeDots as Options } from "react-icons/bs";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NearMeIcon from '@material-ui/icons/NearMe';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import { format } from "date-fns";
import { Avatar } from '@material-ui/core';
import StoryReel from './StoryReel';
import CreatePost from "./CreatePost";
import { editPost, removePost } from "../../../store/posts"
import useConsumeContext from "../../../context/ModalContext";
import "./Feed.css";
import "./Post.css";



const Feed = ({ user }) => {
    const { showEditDeleteOptions, setShowEditDeleteOptions, showEditInput, setShowEditInput } = useConsumeContext();
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts);
    const allPosts = Object.values(posts).reverse();
    const [thePostID, setThePostID] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [newPostURL, setNewPostURL] = useState("");
    const dispatch = useDispatch();

    // console.log("DROPDOWN isOPEN?", showEditDeleteOptions);
    // console.log("EDIT INPUT BOX isOPEN?", showEditInput);

    const handleClick = (e) => {
        e.stopPropagation();
        setThePostID(e.target.parentNode.classList[0]);
        setShowEditDeleteOptions(prevState => !prevState);
    }

    const handleSubmitEditedPost = async (e) => {
        e.preventDefault();
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

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllPosts());
    }, [dispatch])

    return (
        <div className="feed">
            <StoryReel user={user} />
            <CreatePost user={user} />
            {allPosts.length > 0 && allPosts?.map((post, index) => (
                <div className="post" key={index}>
                    <div className="post__top">
                        <Avatar className="post__avatar" src={users[post?.user_id]?.profile_src} />
                        <div className="postTop__info">
                            <h3>{`${users[post.user_id]?.firstname} ${users[post?.user_id]?.lastname}`}</h3>
                            <p>{format(new Date(post?.updated_at), "MMM d YYY, hh:mm a")}</p>
                        </div>
                        {/* It will only show when it's the user's post */}
                        {user?.id === post.user_id && 
                        <div className={`${post?.id} post__optionIcon`} onClick={handleClick}>
                            <Options id="options__icon"/>
                        </div>}
                    </div>
                    {/* This shows the dropdown options for the SPECIFIC post you clicked on */}
                    {/* {Number(thePostID) === Number(post?.id) */}
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
                        // : null
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
            ))}
        </div>
    )
}

export default Feed;
