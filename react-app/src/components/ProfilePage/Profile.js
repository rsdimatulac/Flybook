import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDots as Options } from "react-icons/bs";
import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SchoolIcon from '@material-ui/icons/School';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import CakeIcon from '@material-ui/icons/Cake';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { editUserProfile, getUser } from "../../store/user";
import { getAllPosts } from "../../store/posts";
import { Modal } from "../../context/Modal";
import CreatePost from "../NewsFeedPage/Feed/CreatePost";
import Post from "../NewsFeedPage/Feed/Post";
import useConsumeContext from "../../context/ModalContext";
import "./ProfileModals.css";
import "./Profile.css";


const Profile = ({ currentUser }) => {
    const { showEditProfile, setShowEditProfile, showPhotoModal, setShowPhotoModal, showCoverModal, setShowCoverModal } = useConsumeContext();
    const { userId } = useParams();
    const posts = useSelector(state => state.posts);
    const userPosts = Object.values(posts)?.filter(post => post.wall_id === Number(userId)); // the posts of the user you're vieiwing
    const userPostsWithPhotos = userPosts?.filter(post => post.photo_src !== null && post.photo_src !== ""); // the posts with Photos of the user you're vieiwing
    const user = useSelector(state => state.user); // user you're viewing
    const theUser = user[userId]; // the user you're viewing
    const userFriends = theUser?.friends; // the friends of the user you're viewing
    const isFriends = currentUser?.friends?.some(friend => friend?.id === Number(userId))

    const [showBioInput, setShowBioInput] = useState(false);
    const [newCover, setNewCover] = useState("");
    const [newPhoto, setNewPhoto] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newSchool, setNewSchool] = useState("");
    const [newWork, setNewWork] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newBirthday, setNewBirthday] = useState("");
    const [showTimeline, setShowTimeline] = useState(true);
    const [showAbout, setShowAbout] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    // MIGHT NEED TO MOVE IN THE MODAL CONTEXT vvvvv
    const [isFriendAdded, setIsFriendAdded] = useState(false);
    const userBirthday = `${theUser?.birthday.slice(8, 11)} ${theUser?.birthday.slice(5, 7)}, ${theUser?.birthday.slice(12, 16)}`;
    const userJoined = theUser?.created_at.slice(12, 16);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getUser(Number(userId)));
    }, [dispatch, userId]);

    const handleAddFriendClick = () => {
        setIsFriendAdded(prevState => !prevState);
        // more logic to do here
        // BONUS: Friend Request
    }

    const handleTimelineClick = () => {
        setShowTimeline(true);
        setShowAbout(false);
        setShowFriends(false);
        setShowPhotos(false);
    };

    const handleAboutClick = () => {
        setShowTimeline(false);
        setShowAbout(true);
        setShowFriends(false);
        setShowPhotos(false);
    };

    const handleFriendsClick = () => {
        setShowTimeline(false);
        setShowAbout(false);
        setShowFriends(true);
        setShowPhotos(false);
    };

    const handlePhotosClick = () => {
        setShowTimeline(false);
        setShowAbout(false);
        setShowFriends(false);
        setShowPhotos(true);
    };

    const handleEditPhoto = (photoSrc) => () => {
        setShowPhotoModal(prevState => !prevState);
        setNewPhoto(photoSrc ? photoSrc : "");
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, [{ type: "profile_src", data: newPhoto }]));
        setShowPhotoModal(false);
        setNewBio("");
    };

    const handleEditCover = (coverSrc) => () => {
        setShowCoverModal(prevState => !prevState);
        setNewCover(coverSrc ? coverSrc : "");
    };

    const handleCoverSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserProfile(currentUser?.id, [{ type: "cover_src", data: newCover }]));
        setShowCoverModal(false);
        setNewCover("");
    };

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
        const updates = [{ type: "work", data: newWork }, { type: "school", data: newSchool }, { type: "location", data: newLocation }, { type: "birthday", data: newBirthday }];
        await dispatch(editUserProfile(currentUser?.id, updates));
        setShowEditProfile(false);
        setNewSchool("");
        setNewWork("");
        setNewLocation("");
        setNewBirthday("");
    };

    const profileIntro = () => {
        return (
            <>
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
            </>
        )
    }

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
                        <p>{201 - newBio.length} characters remaining</p>
                        <div className="bio__buttons">
                            <div onClick={() => setShowBioInput(prevState => !prevState)}>Cancel</div>
                            <button disabled={(201 - newBio.length) < 0 ? true : false} type="submit">Save</button>
                        </div>
                    </form>
                    : <h2>{theUser?.bio ? `${theUser?.bio}` : `Add bio`}</h2>}
                {showBioInput === false && currentUser.id === Number(userId) && <div className="editBio__button" onClick={handleEditBio(theUser?.bio)}>Edit</div>}
            </div>
            <div className="profile__nav">
                <div className="profileNav__links">
                    <div onClick={handleTimelineClick} className={showTimeline ? `profileNav__links--active` : ""}><p>Timeline</p></div>
                    <div onClick={handleAboutClick} className={showAbout ? `profileNav__links--active` : ""}><p>About</p></div>
                    <div onClick={handleFriendsClick} className={showFriends ? `profileNav__links--active` : ""}><p>Friends <span style={{ color: "#65676B", fontSize: 15, fontWeight: 400, marginLeft: 5 }}>{userFriends?.length}</span></p></div>
                    <div onClick={handlePhotosClick} className={showPhotos ? `profileNav__links--active` : ""}><p>Photos</p></div>
                </div>
                <div onClick={handleEditProfile(theUser?.school, theUser?.work, theUser?.location, userBirthday)} className="profileNav__edit" style={{ display: currentUser.id === Number(userId) ? `` : `none` }}>
                    <EditIcon />
                    <p>Edit Profile</p>
                </div>
                {/* TODO: IF THAT PERSON IS ON YOUR FRIEND REQUEST RECEIVED LIST, SHOW CONFIRM OR DELETE REQUEST BUTTON INSTEAD */}
                {currentUser?.id !== Number(userId) && isFriends === false &&
                    <div className="add__friend" onClick={handleAddFriendClick}>
                        {isFriendAdded ? <PersonAddDisabledIcon/> : <PersonAddIcon />}
                        <p>{isFriendAdded ? "Cancel Request" : "Add Friend"}</p>
                    </div>
                }
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
            {showTimeline && 
            <div className="profileNav__timeline">
                <div className="timeline__left">
                    <div className="profile__intro">
                        <h1>Intro</h1>
                        {profileIntro()}
                        <div onClick={handleEditProfile(theUser?.school, theUser?.work, theUser?.location, userBirthday)} className="profileIntro__edit" style={{ display: currentUser.id === Number(userId) ? `` : `none` }}>
                            <EditIcon />
                            <p>Edit Profile</p>
                        </div>
                    </div>
                    <div className="profile__photos">
                        <h1>Photos <span onClick={handlePhotosClick}>See All Photos</span></h1>
                        <div className="photos">
                            <div className="each__photo"><img src={theUser?.profile_src} alt="" /></div>
                            <div className="each__photo"><img src={theUser?.cover_src} alt="" /></div>
                            {userPostsWithPhotos && userPostsWithPhotos?.slice(0, 7).map(post => (
                                <div key={post?.id} className="each__photo"><img src={post.photo_src} alt=""/></div>
                            ))}
                        </div>
                    </div>
                    <div className="profile__friends">
                        <h1>Friends <span onClick={handleFriendsClick}>See All Friends</span></h1>
                        {userFriends?.length === 1 && userFriends?.length !== 0 ? <p>{userFriends?.length} friend</p> : <p>{userFriends?.length} friends</p>}
                        <div className="friends__list">
                            {userFriends?.length > 0 
                            ? userFriends?.slice(0, 9).map(friend => (
                                <div className="each__friend" key={friend?.id} onClick={() => history.push(`/users/${friend?.id}`)}>
                                    <div className="each__photo"><img src={friend?.profile_src} alt="" /></div>
                                    <p>{friend?.firstname} {friend?.lastname}</p>
                                </div>
                            ))
                            : <p className="no__friends">No friends</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="timeline__right">
                    <CreatePost user={currentUser}/>
                    {userPosts?.length > 0 
                    ? userPosts?.reverse().map((post, index) => (<Post post={post} key={index} user={theUser} currentUser={currentUser}/>))
                    : <div className="no__posts">No posts</div>
                    }
                </div>
            </div>}
            {showAbout && 
            <div className="profileNav__about">
                <div className="about__container">
                    <h1>About</h1>
                    {profileIntro()}
                    <div>
                        <EmailIcon />
                        <p>Email: <span>{theUser?.email}</span></p>
                    </div>
                    <div onClick={handleEditProfile(theUser?.school, theUser?.work, theUser?.location, userBirthday)} className="about__editButton" style={{ display: currentUser.id === Number(userId) ? `` : `none` }}>
                        <EditIcon />
                        <p>Edit Details</p>
                    </div>
                </div>
            </div>}
            {showFriends && 
            <div className="profileNav__friends">
                <div className="friends__container">
                    <h1>Friends</h1>
                    <div>
                        {userFriends.length > 0 ? userFriends?.map(friend => (
                            <div className="each__friendContainer" key={friend?.id} >
                                <div className="each__friendContainerImg" onClick={() => history.push(`/users/${friend?.id}`)}><img src={friend?.profile_src} alt="" /></div>
                                <div className="each__friendContainerName" >
                                    <h3 onClick={() => history.push(`/users/${friend?.id}`)}>{friend?.firstname} {friend?.lastname}</h3>
                                </div>
                                {currentUser?.id === Number(userId) &&
                                    <div className={`${friend?.id} friend__optionIcon`}>
                                        <Options/>
                                    </div>
                                }
                            </div> 
                        ))
                        : <p className="no__friends">No friends</p>}
                    </div>
                </div>
            </div>}
            {showPhotos && <div className="profileNav__photos">
                <div className="photos__container">
                    <h1>Photos</h1>
                    <div>
                        <div className="each__photoContainer"><img src={theUser?.profile_src} alt="" /></div>
                        <div className="each__photoContainer"><img src={theUser?.cover_src} alt="" /></div>
                        {userPostsWithPhotos && userPostsWithPhotos?.map(post => (
                            <div key={post?.id} className="each__photoContainer"><img src={post.photo_src} alt="" /></div>
                        ))}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Profile;
