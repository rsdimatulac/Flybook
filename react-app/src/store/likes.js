// constants
const ADD_POSTLIKE = "likes/ADD_POSTLIKE";
const ADD_COMMENTLIKE = "likes/ADD_COMMENTLIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";

const addPostLike = (like) => ({
    type: ADD_POSTLIKE,
    like
})

const addCommentLike = (like) => ({
    type: ADD_COMMENTLIKE,
    like
})

const deleteLike = (like) => ({
    type: DELETE_LIKE,
    like
})

export const createPostLike = (post_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/${post_id}/likes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id,
                updated_at: new Date(),
                created_at: new Date()
            })
        });
        if (!response.ok) throw response;
        const like = await response.json();
        dispatch(addPostLike(like));
        return like;
    } catch (error) {
        console.log(error)
    }
}

export const createCommentLike = (comment_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${comment_id}/likes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment_id,
                updated_at: new Date(),
                created_at: new Date()
            })
        });
        if (!response.ok) throw response;
        const like = await response.json();
        dispatch(addCommentLike(like));
        return like;
    } catch (error) {
        console.log(error)
    }
}

export const removeLike = (like_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/likes/${like_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ like_id })
        });
        if (!response.ok) throw response;
        const like = await response.json();
        dispatch(deleteLike(like));
        return like;
    } catch (error) {
        console.log(error)
    }
}

const initialState = {};

export default function likeReducer(state = initialState, action) {
    const state_dup = { ...state }
    switch (action.type) {
        case ADD_POSTLIKE:
            state_dup[action.like.id] = action.like
            return state_dup
        case ADD_COMMENTLIKE:
            state_dup[action.like.id] = action.like
            return state_dup
        case DELETE_LIKE:
            delete state_dup[action.like.id]
            return state_dup
        default:
            return state;
    }
}