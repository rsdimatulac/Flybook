const SET_USER = "users/SET_USER";

const GET_USER = "users/GET_USER";

const editProfile = (user) => ({
    type: SET_USER,
    user
});

const setUser = (user) => ({
    type: GET_USER,
    user
});


export const getUser = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw response;
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    } catch (error) {
        console.log(error);
    };
};

export const editUserProfile = (id, updates) => async (dispatch) => {
    console.log("JSON", id, JSON.stringify([updates]))
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([updates]) // might be without curly braces
        });
        // updates = [{}, {}]
        if (!response.ok) throw response;
        const data = await response.json();
        dispatch(editProfile(data))
        return data;
    } catch (error) {
        console.log(error)
    }
}

const initialState = {};

export default function userReducer(state = initialState, action) {
    const state_dup = { ...state }
    switch (action.type) {
        case SET_USER:
            state_dup[action.user.id] = action.user
            return state_dup
        case GET_USER:
            state_dup[action.user.id] = action.user
            return state_dup
        default:
            return state;
    }
}
