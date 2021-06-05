import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { createPost } from "../../../store/posts";
import "./CreatePost.css";


const CreatePost = ({ user }) => {

    const [postBody, setPostBody] = useState("");
    const [postURL, setPostURL] = useState("");
    const [wallId, setWallId] = useState("")
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname === "/feed") {
            setWallId(user?.id)
        }
    }, [user.id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = await dispatch(createPost(postBody, postURL, wallId));
        // if (post?.errors) {
        //     setErrors(post?.errors)
        // };
        setPostBody("");
        setPostURL("");
    }

    return (
        <div className="create__post">
            <div className="createPost__top">
                <Avatar src={user?.profile_src} />
                <form onSubmit={handleSubmit} >
                    <input
                        className="createPost__body"
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                        type="text"
                        required
                        placeholder={`What's on your mind, ${user?.firstname}?`}
                    />
                    <input
                        type="text"
                        value={postURL}
                        onChange={(e) => setPostURL(e.target.value)}
                        placeholder="image URL (Optional)"
                    />
                    <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                </form>
                {/* <div className="errors">
                    {errors?.map(error => (<div className="errors__div" key={error}>・{error}</div>))}
                </div> */}
            </div>
            <div className="createPost__bottom">
                <div className="createPost__option">
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