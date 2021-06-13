import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
// import VideocamIcon from '@material-ui/icons/Videocam';
import CreateIcon from '@material-ui/icons/Create';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { createPost } from "../../../store/posts";
import { getUser } from "../../../store/user";
import useConsumeContext from "../../../context/ModalContext";
import "./CreatePost.css";


const CreatePost = ({ user }) => {
    const { setShowCreatePostModal, showEmojiPicker, setShowEmojiPicker } = useConsumeContext();
    const { userId } = useParams();
    const stateUser = useSelector(state => state.user);
    const theUser = stateUser[user.id];
    let [postBody, setPostBody] = useState("");
    const [postURL, setPostURL] = useState("");
    const [wallId, setWallId] = useState("");
    const [emoji, setEmoji] = useState("");
    const [showPhotoInput, setShowPhotoInput] = useState(false);
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname === "/feed") {
            setWallId(user?.id);
        } else if (window.location.pathname.includes("/users/")) {
            setWallId(Number(userId));
        };
    }, [user.id, userId]);

    useEffect(() => {
        dispatch(getUser(user?.id));
    }, [dispatch, user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createPost(postBody, postURL, wallId));
        // if (post?.errors) {
        //     setErrors(post?.errors)
        // };
        setPostBody("");
        setPostURL("");
        setShowCreatePostModal(false);
        setEmoji("");
        setShowEmojiPicker(false);
    };

    return (
        <div className="create__post">
            <div className="createPost__top">
                <div>
                    <Avatar src={theUser?.profile_src} />
                    <form onSubmit={handleSubmit} >
                        <input
                            className="createPost__body"
                            // value={postBody}
                            value={postBody += emoji.emoji ? emoji.emoji : ""}
                            onChange={(e) => setPostBody(e.target.value)}
                            type="text"
                            required
                            placeholder={window.location.pathname.includes("/users/") ? `What's on your mind?` : `What's on your mind, ${`${user?.firstname[0].toUpperCase()}${user?.firstname?.slice(1)}`}?`}
                        />
                        {showPhotoInput && <input
                            className="createPost__url"
                            type="text"
                            value={postURL}
                            onChange={(e) => setPostURL(e.target.value)}
                            placeholder="image URL (Optional)"
                        />}
                        <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                    </form>
                </div>
                <p>Press Enter key or Post to share your post.</p> 
                {/* <div className="errors">
                    {errors?.map(error => (<div className="errors__div" key={error}>・{error}</div>))}
                </div> */}
            </div>
            <div className="createPost__bottom">
                <form onSubmit={handleSubmit}>
                    <input required className="hidden__postInput" type="text" onChange={(e) => setPostBody(e.target.value)} value={postBody += emoji.emoji ? emoji.emoji : ""}/>
                    <button type="submit" className="createPost__option" >
                        {/* <div className="createPost__option" style={{ display: window.location.pathname.includes("/users/") ? `none` : `` }}> */}
                        <CreateIcon style={{ color: "#2e81f4" }} />
                        <h3>Post</h3>
                    </button>
                </form>
                <div className="createPost__option" onClick={() => setShowPhotoInput(prevState => !prevState)} style={{ color: showPhotoInput ? "#2e81f4" : "gray" }}>
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo</h3>
                </div>
                <div className="createPost__option" onClick={() => setShowEmojiPicker(prevState => !prevState)} style={{ color: showEmojiPicker ? "#2e81f4" : "gray" }}>
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling</h3>
                </div>
            </div>
            {showEmojiPicker && 
            <EmojiPicker 
                preload={true} 
                onEmojiClick={(e, emojiObject) => setEmoji(emojiObject)}
                groupVisibility={{
                    symbols: false,
                }}
            />}
        </div>
    )
}

export default CreatePost;
