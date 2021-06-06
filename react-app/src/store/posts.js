// constants
const GET_POSTS = "posts/GET_POSTS";
const ADD_POST = "posts/ADD_POST";
const SET_POST = "posts/SET_POST";
const DELETE_POST = "posts/DELETE_POST";

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});

const addPost = (post) => ({
    type: ADD_POST,
    post
});

const setPost = (post) => ({
    type: SET_POST,
    post
});

const deletePost = (post) => ({
    type: DELETE_POST,
    post
});

export const getAllPosts = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/`);
        if (!response.ok) throw response;
        const posts = await response.json();
        dispatch(getPosts(posts));
        return posts;
    } catch(error) {
        console.log(error)
    }
}

export const createPost = (body, photo_src, wall_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body,
                photo_src,
                wall_id,
                updated_at: new Date(),
                created_at: new Date()
            })
        });
        if (!response.ok) throw response;
        const post = await response.json();
        dispatch(addPost(post));
        return post;
    } catch (error) {
        console.log(error)
    }
}


export const editPost = (post_id, body, photo_src) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body,
                photo_src,
                post_id,
                updated_at: new Date()
            })
        });
        if (!response.ok) throw response;
        const post = await response.json();
        dispatch(setPost(post));
        return post;
    } catch (error) {
        console.log(error)
    }
}


export const removePost = (post_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id
            })
        });
        if (!response.ok) throw response;
        const post = await response.json();
        dispatch(deletePost(post));
        return post;
    } catch (error) {
        console.log(error)
    }
}

const initialState = {};

export default function postReducer(state = initialState, action) {
    const state_dup = {...state}
    switch (action.type) {
        case GET_POSTS:
            return {...action.posts}
        case ADD_POST:
            state_dup[action.post.id] = action.post
            return state_dup
        case SET_POST:
            state_dup[action.post.id] = action.post
            return state_dup
        case DELETE_POST:
            delete state_dup[action.post.id]
            return state_dup
        default:
            return state;
    }
}