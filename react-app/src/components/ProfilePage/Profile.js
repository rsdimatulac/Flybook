import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
// import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile, getUser } from "../../store/user";
import "./Profile.css";


const Profile = ({ currentUser }) => {
    const { userId } = useParams();
    const user = useSelector(state => state.user);
    const theUser = user[userId];
    const [showBioInput, setShowBioInput] = useState(false);
    const [newBio, setNewBio] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(Number(userId)))
    }, [dispatch, userId])


    const handleEditBio = (bio) => () => {
        
        setShowBioInput(true);
        setNewBio(bio ? bio : "");
    }

    const handleBioSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, { type: "bio", data: newBio }));

        setShowBioInput(false);
        setNewBio("");
    };

    return (
        <div className="profile">
            <div className="profile__top">
                <div className="cover__photo" style={{ backgroundImage: theUser ? `url(${theUser?.cover_src})` : null }}></div>
                <div className="profile__avatar">
                    <img src={theUser?.profile_src} alt="" />
                </div>
            </div>
            <div className="profile__name">
                <h1>{theUser?.firstname} {theUser?.lastname}</h1>
                {showBioInput
                    ? <form onSubmit={handleBioSubmit}>
                        <textarea className="bio__textarea" value={newBio} onChange={(e) => setNewBio(e.target.value)} />
                        <p>{101 - newBio.length} characters remaining</p>
                        <div className="bio__buttons">
                            <div onClick={() => setShowBioInput(prevState => !prevState)}>Cancel</div>
                            <button disabled={(101 - newBio.length) < 0 ? true : false} type="submit">Save</button>
                        </div>
                    </form>
                    : <h2>{theUser?.bio}</h2>}
                {showBioInput === false && currentUser.id === Number(userId) && <div className="editBio__button" onClick={handleEditBio(theUser?.bio)}>Edit</div>}
            </div>
            <div className="profile__nav">
                <div className="profileNav__links">
                    <div className={`profileNav__links--active`}><p>Timeline</p></div>
                    <div><p>About</p></div>
                    <div><p>Friends</p></div>
                    <div><p>Photos</p></div>
                </div>
                <div className="profileNav__edit">
                    <EditIcon />
                    <p>Edit Profile</p>
                </div>
            </div>
            <div className="profile__bottom">
                <div className="bottom__left">Left side</div>
                <div className="bottom__right">Right side</div>
            </div>
        </div>
    )
}

export default Profile;
