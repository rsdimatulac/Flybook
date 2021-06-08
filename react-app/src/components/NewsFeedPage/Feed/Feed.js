import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import StoryReel from './StoryReel';
import CreatePost from "./CreatePost";
import Post from "./Post";
import "./Feed.css";
import "./Post.css";


const Feed = ({ user }) => {
    const posts = useSelector(state => state.posts);
    const allPosts = Object.values(posts).reverse();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])

    return (
        <div className="feed">
            <StoryReel user={user} />
            <CreatePost user={user} />
            {allPosts.length > 0 && allPosts?.map((post, index) => (
                <Post key={index} post={post} currentUser={user}/>
            ))}
        </div>
    )
}

export default Feed;
