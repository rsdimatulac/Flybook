// bio
// name
// profile_src
// cover_src
// work
// school
// location

// frontend to backend

// this will be Edit THUNK

const editProfile = (type, data) => async (dispatch) => {
    const response = await fetch(apiRouteHere, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            data
        })
    })

}


