// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(setUser(data))
}

// export const confirmEmail = (email) => async (dispatch) => {
//   const response = await fetch('/api/auth/forgot_password', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email
//     })
//   });
//   const data = await response.json();
//   if (data.errors) {
//     return data;
//   }

//   dispatch(setUser(data))
//   return {};
// }

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data))
  return {};
}

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });

  await response.json();
  dispatch(removeUser());
};

export const signUp = ({ firstname, lastname, email, birthday, password }) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      birthday,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data))
  return {};
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
