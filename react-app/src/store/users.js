// constants
const GET_USERS = "users/GET_USERS";

const GET_USER = "users/GET_USER";

const setUsers = (users) => ({
    type: GET_USERS,
    users
});

const setUser = (user) => ({
    type: GET_USER,
    user
});

// bio
// name
// profile_src
// cover_src
// work
// school
// location
export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/`);
        if (!response.ok) throw response;
        const users = await response.json();
        dispatch(setUsers(users));
        return users;
    } catch(error) {
        console.log(error);
    };
};

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


const initialState = {};

export default function usersReducer(state = initialState, action) {
    const state_dup = { ...state }
    switch (action.type) {
        case GET_USERS:
            return {...action.users}
        case GET_USER:
            state_dup[action.user.id] = action.user
            return state_dup
        default:
            return state;
    }
}