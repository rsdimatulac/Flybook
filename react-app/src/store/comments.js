// constants
const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const SET_COMMENT = "comments/SET_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

const setComment = (comment) => ({
    type: SET_COMMENT,
    comment
});

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
});

export const getAllComments = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/`);
        if (!response.ok) throw response;
        const comments = await response.json();
        dispatch(getComments(comments));
        return comments;
    } catch (error) {
        console.log(error)
    }
}

export const createComment = (body, post_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                body, 
                post_id,
                updated_at: new Date(),
                created_at: new Date()
            })
        });
        if (!response.ok) throw response;
        const comment = await response.json();
        dispatch(addComment(comment));
        return comment;
    } catch (error) {
        console.log(error)
    }
}


export const editComment = (comment_id, body) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${comment_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body,
                comment_id,
                updated_at: new Date(),
            })
        });
        if (!response.ok) throw response;
        const comment = await response.json();
        dispatch(setComment(comment));
        return comment;
    } catch (error) {
        console.log(error)
    }
}


export const removeComment = (comment_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${comment_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment_id })
        });
        if (!response.ok) throw response;
        const comment = await response.json();
        dispatch(deleteComment(comment));
        return comment;
    } catch (error) {
        console.log(error)
    }
}

const initialState = {};

export default function commentReducer(state = initialState, action) {
    const state_dup = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            return { ...action.comments }
        case ADD_COMMENT:
            state_dup[action.comment.id] = action.comment
            return state_dup
        case SET_COMMENT:
            state_dup[action.comment.id] = action.comment
            return state_dup
        case DELETE_COMMENT:
            delete state_dup[action.comment.id]
            return state_dup
        default:
            return state;
    }
}