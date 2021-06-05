import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import { getAllUsers } from "../../../store/users";
import StoryReel from './StoryReel';
import CreatePost from "./CreatePost";
import Post from "./Post";
import "./Feed.css";


const Feed = ({ user }) => {
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts);
    const allPosts = Object.values(posts).reverse();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllPosts());
    }, [dispatch])

    return (
        <div className="feed">
            <StoryReel user={user} />
            <CreatePost user={user} />
            {allPosts.length > 0 && allPosts?.map(post => (
                <Post
                    key={post?.id}
                    avatar={users[post?.user_id]?.profile_src}
                    username={`${users[post.user_id]?.firstname} ${users[post?.user_id]?.lastname}`}
                    body={post?.body}
                    image={post?.photo_src}
                    timestamp={post?.created_at}
                />
            ))}
        </div>
    )
}

export default Feed;
