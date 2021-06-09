import { Avatar } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../store/user";
import React, { useEffect } from 'react';
import "./Widgets.css";

const Widgets = ({ user }) => {
    const stateUser = useSelector(state => state.user);
    const theUser = stateUser[user?.id];
    const userFRs = theUser?.request_received;
    const dispatch = useDispatch();
    const history = useHistory();
    console.log("user", theUser?.request_received)

    const goToProfile = (friendId) => () => {
        history.push(`/users/${friendId}`);
    };

    useEffect(() => {
        dispatch(getUser(user?.id))
    }, [dispatch, user.id]);

    return (
        <div className="widgets">
            <h1>Friend Requests</h1>
            {userFRs?.length > 0 
            ? userFRs?.map(request => (<div className="friend__requests" key={request?.id}>
                <div className="fr__avatar" onClick={goToProfile(request?.id)}>
                    <Avatar src={request?.profile_src}/>
                </div>
                <div className="fr__info">
                    <h3><span onClick={goToProfile(request?.id)}>{request?.firstname} {request?.lastname}</span> sent you a friend request.</h3>
                    {/* <p>2 days ago</p> */}
                    <div className="fr__buttons">
                        <div className="frConfirm__button">Confirm</div>
                        <div className="frDelete__button">Delete</div>
                    </div>
                </div>
            </div>))
            : <div className="friend__requests" style={{ padding: "15px 20px"}}>No friend requests</div>
            }
        </div>
    )
}

export default Widgets;
