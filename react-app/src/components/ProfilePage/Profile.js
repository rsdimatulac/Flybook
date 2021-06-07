import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import { format, parseISO } from "date-fns";
import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SchoolIcon from '@material-ui/icons/School';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import CakeIcon from '@material-ui/icons/Cake';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile, getUser } from "../../store/user";
import useConsumeContext from "../../context/ModalContext";
import { Modal } from "../../context/Modal";
import "./ProfileModals.css";
import "./Profile.css";


const Profile = ({ currentUser }) => {
    const { showEditProfile, setShowEditProfile, showPhotoModal, setShowPhotoModal, showCoverModal, setShowCoverModal } = useConsumeContext();
    const { userId } = useParams();
    const user = useSelector(state => state.user);
    const theUser = user[userId];
    const [showBioInput, setShowBioInput] = useState(false);
    const [newCover, setNewCover] = useState("");
    const [newPhoto, setNewPhoto] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newSchool, setNewSchool] = useState("");
    const [newWork, setNewWork] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newBirthday, setNewBirthday] = useState("");
    const userBirthday = `${theUser?.birthday.slice(8, 11)} ${theUser?.birthday.slice(5, 7)}, ${theUser?.birthday.slice(12, 16)}`
    // const userBirthdayTwo = `${theUser?.birthday.slice(12, 16)}-${theUser?.birthday.slice(8, 11)}-${theUser?.birthday.slice(5, 7)}`
    const userJoined = theUser?.created_at.slice(12, 16)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(Number(userId)));
    }, [dispatch, userId]);

    const handleEditPhoto = (photoSrc) => () => {
        setShowPhotoModal(prevState => !prevState);
        setNewPhoto(photoSrc ? photoSrc : "");
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, [{ type: "profile_src", data: newPhoto }]));
        setShowPhotoModal(false);
        setNewBio("");
    }

    const handleEditCover = (coverSrc) => () => {
        setShowCoverModal(prevState => !prevState);
        setNewCover(coverSrc ? coverSrc : "");
    }

    const handleCoverSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, [{ type: "cover_src", data: newCover }]));
        setShowCoverModal(false);
        setNewCover("");
    }

    const handleEditBio = (bio) => () => {
        setShowBioInput(true);
        setNewBio(bio ? bio : "");
    };

    const handleBioSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, [{ type: "bio", data: newBio }]));

        setShowBioInput(false);
        setNewBio("");
    };

    const handleEditProfile = (school, work, location, birthday) => () => {
        setShowEditProfile(true);
        setNewSchool(school ? school : "");
        setNewWork(work ? work : "");
        setNewLocation(location ? location : "");
        setNewBirthday(birthday ? birthday : "");
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const updates = [{ type: "work", data: newWork }, { type: "school", data: newSchool }, { type: "location", data: newLocation }, { type: "birthday", data: newBirthday }]
        await dispatch(editUserProfile(currentUser?.id, updates))
        setShowEditProfile(false);
        setNewSchool("");
        setNewWork("");
        setNewLocation("");
        setNewBirthday("");
    };

    return (
        <div className="profile">
            <div className="profile__top">
                <div className="cover__photo" style={{ backgroundImage: theUser ? `url(${theUser?.cover_src})` : `url(https://theflybook.s3.amazonaws.com/cover.png)` }}>
                    {currentUser.id === Number(userId)
                        && <div className="cover__add" onClick={handleEditCover(theUser?.cover_src)}>
                            <CameraAltIcon />
                            <p>Edit Cover Photo</p>
                        </div>}
                </div>
                <div className="profile__avatar">
                    <img src={theUser?.profile_src} alt="" />
                    {currentUser.id === Number(userId) && <div className="profile__add" onClick={handleEditPhoto(theUser?.profile_src)}><CameraAltIcon /></div>}
                </div>
            </div>
            {showPhotoModal &&
                <Modal onClose={() => setShowPhotoModal(prevState => !prevState)}>
                    <div className="photo__modal">
                        <div><h1>Update Profile Photo</h1></div>
                        <form onSubmit={handlePhotoSubmit}>
                            <textarea className="photo__textarea" value={newPhoto} onChange={(e) => setNewPhoto(e.target.value)} />
                            <p>{501 - newPhoto.length} characters remaining</p>
                            <div className="photo__buttons">
                                <div onClick={() => setShowPhotoModal(prevState => !prevState)}>Cancel</div>
                                <button disabled={(501 - newPhoto.length) < 0 ? true : false} type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
            {showCoverModal &&
                <Modal onClose={() => setShowCoverModal(prevState => !prevState)}>
                    <div className="cover__modal">
                        <div><h1>Update Cover Photo</h1></div>
                        <form onSubmit={handleCoverSubmit}>
                            <textarea className="cover__textarea" value={newCover} onChange={(e) => setNewCover(e.target.value)} />
                            <p>{501 - newCover.length} characters remaining</p>
                            <div className="cover__buttons">
                                <div onClick={() => setShowCoverModal(prevState => !prevState)}>Cancel</div>
                                <button disabled={(501 - newCover.length) < 0 ? true : false} type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
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
                    : <h2>{theUser?.bio ? `${theUser?.bio}` : `Add bio`}</h2>}
                {showBioInput === false && currentUser.id === Number(userId) && <div className="editBio__button" onClick={handleEditBio(theUser?.bio)}>Edit</div>}
            </div>
            <div className="profile__nav">
                <div className="profileNav__links">
                    <div className={`profileNav__links--active`}><p>Timeline</p></div>
                    <div><p>About</p></div>
                    <div><p>Friends</p></div>
                    <div><p>Photos</p></div>
                </div>
                <div onClick={handleEditProfile(theUser?.school, theUser?.work, theUser?.location, userBirthday)} className="profileNav__edit" style={{ display: currentUser.id === Number(userId) ? `` : `none` }}>
                    <EditIcon />
                    <p>Edit Profile</p>
                </div>
            </div>
            {showEditProfile && currentUser.id === Number(userId) &&
                <Modal onClose={() => setShowEditProfile(prevState => !prevState)}>
                    <div className="editProfile__modal">
                        <div><h1>Edit Profile</h1></div>
                        <form onSubmit={handleProfileSubmit}>
                            <h3>School</h3>
                            <input type="text" name="school" placeholder="Add school" value={newSchool} onChange={(e) => setNewSchool(e.target.value)} autoComplete="off" />
                            <h3>Work</h3>
                            <input type="text" name="work" placeholder="Add work" value={newWork} onChange={(e) => setNewWork(e.target.value)} autoComplete="off" />
                            <h3>Location</h3>
                            <input type="text" name="location" placeholder="Add location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} autoComplete="off" />
                            <h3>Birthday</h3>
                            <input type="date" name="birthday" value={newBirthday} onChange={(e) => setNewBirthday(e.target.value)} />
                            <div className="editProfile__buttons">
                                <div onClick={() => setShowEditProfile(prevState => !prevState)}>Cancel</div>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
            <div className="profile__bottom">
                <div className="bottom__left">
                    <div className="profile__intro">
                        <h1>Intro</h1>
                        {/* style={{ display: currentUser.id === Number(userId) ? `` : `none` }} */}
                        {/* style={{ display: currentUser.id === Number(userId) && theUser?.work === "" ? `` : `none` }} */}
                        <div>
                            <SchoolIcon />
                            {theUser?.school ? <p>Studied at <span>{theUser?.school}</span></p> : <p>Add school</p>}
                        </div>
                        <div>
                            <WorkIcon />
                            {theUser?.work ? <p><span>{theUser?.work}</span></p> : <p>Add work</p>}
                        </div>
                        <div>
                            <LocationOnIcon />
                            {theUser?.location ? <p>From <span>{theUser?.location}</span></p> : <p>Add location</p>}
                        </div>
                        <div>
                            <CakeIcon />
                            <p>Born on <span>{userBirthday}</span></p>
                        </div>
                        <div>
                            <LoyaltyIcon />
                            <p>Joined since <span>{userJoined}</span></p>
                        </div>
                        <div onClick={handleEditProfile(theUser?.school, theUser?.work, theUser?.location, userBirthday)} className="profileIntro__edit" style={{ display: currentUser.id === Number(userId) ? `` : `none` }}>
                            <EditIcon />
                            <p>Edit Profile</p>
                        </div>
                    </div>
                    <div className="profile__photos">
                        <h1>Photos</h1>
                    </div>
                    <div className="profile__friends">
                        <h1>Friends</h1>
                    </div>
                </div>
                <div className="bottom__right">
                    <div className="profile__createPost">CreatePost Here</div>
                    <div className="profile__eachPost">Each post</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
