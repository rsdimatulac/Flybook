import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createComment } from "../../../store/comments";
import { Avatar } from '@material-ui/core';
import "./CreateComment.css";


const CreateComment = ({ postID, currentUser }) => {
    const [commentBody, setCommentBody] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment(commentBody, postID));
        setCommentBody("");
    };

    return (
        <div className="create__comment">
            <div>
                <Avatar src={currentUser?.profile_src} />
                <form onSubmit={handleSubmit}>
                    <input
                        className="comment__input"
                        type="text"
                        autoComplete="off"
                        placeholder="Write a comment..."
                        required
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                    <button type="submit" style={{ display: "none" }}>Hidden Submit</button>
                </form>
            </div>
            <p>Press Enter key to share your comment.</p>
        </div>
    )
}

export default CreateComment;
