// constants
const GET_USERS = "users/GET_USERS";

const setUsers = (users) => ({
    type: GET_USERS,
    users
});


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


const initialState = {};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {...action.users}
        default:
            return state;
    }
}