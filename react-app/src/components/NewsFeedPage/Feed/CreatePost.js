import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { createPost } from "../../../store/posts";
import useConsumeContext from "../../../context/ModalContext";
import "./CreatePost.css";


const CreatePost = ({ user }) => {
    const { setShowCreatePostModal } = useConsumeContext();
    const { userId } = useParams();
    const [postBody, setPostBody] = useState("");
    const [postURL, setPostURL] = useState("");
    const [wallId, setWallId] = useState("");
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname === "/feed") {
            setWallId(user?.id);
        } else if (window.location.pathname.includes("/users/")) {
            setWallId(Number(userId));
        };
    }, [user.id, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createPost(postBody, postURL, wallId));
        // if (post?.errors) {
        //     setErrors(post?.errors)
        // };
        setPostBody("");
        setPostURL("");
        setShowCreatePostModal(false);
    };

    return (
        <div className="create__post">
            <div className="createPost__top">
                <div>
                    <Avatar src={user?.profile_src} />
                    <form onSubmit={handleSubmit} >
                        <input
                            className="createPost__body"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            type="text"
                            required
                            placeholder={window.location.pathname.includes("/users/") ? `What's on your mind?` : `What's on your mind, ${user?.firstname}?`}
                        />
                        <input
                            className="createPost__url"
                            type="text"
                            value={postURL}
                            onChange={(e) => setPostURL(e.target.value)}
                            placeholder="image URL (Optional)"
                        />
                        <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                    </form>
                </div>
                <p>Press Enter key to share your post.</p> 
                {/* <div className="errors">
                    {errors?.map(error => (<div className="errors__div" key={error}>・{error}</div>))}
                </div> */}
            </div>
            <div className="createPost__bottom">
                <div className="createPost__option" style={{ display: window.location.pathname.includes("/users/") ? `none` : ``}}>
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="createPost__option">
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="createPost__option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
