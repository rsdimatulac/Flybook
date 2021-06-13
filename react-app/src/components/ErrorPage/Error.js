import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Avatar, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Brightness2Icon from '@material-ui/icons/Brightness2';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import VideoModal from "../NewsFeedPage/VideoModal";
import useConsumeContext from "../../context/ModalContext";
import { authenticate, logout } from "../../store/session";

import "./Error.css";


const Error = () => {
    const { showVideoModal, setShowVideoModal, setShowDropdown, showDropdown } = useConsumeContext();
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogout = async () => {
        dispatch(logout());
        history.push(`/`);
        setShowDropdown(false);
        setShowVideoModal(false);
    }

    const goToProfile = () => {
        setShowDropdown(false);
        setShowVideoModal(false);
        history.push(`/users/${user?.id}`);
    };

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    return (
        <>
            <nav className="navbar">
                <div className="navbar__left">
                    <NavLink to="/feed">
                        <div className="navbar__logo">
                            <img src="https://theflybook.s3.amazonaws.com/facebook_logo.png" alt="" />
                        </div>
                    </NavLink>
                    <div className="navbar__error ">
                        <div className="error__logo">
                            <img src="https://theflybook.s3.amazonaws.com/flybook_logo.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="navbar__middle">
                    <div className="navbar__option" onClick={() => setShowVideoModal(prevState => !prevState)}>
                        <OndemandVideoIcon fontSize="large" />
                    </div>
                    <div className="navbar__option">
                        <a href="https://github.com/rsdimatulac/Flybook" style={{ textDecoration: "none" }}>
                            <GitHubIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="navbar__option">
                        <a href="https://www.linkedin.com/in/renerosedimatulac/" style={{ textDecoration: "none" }}>
                            <LinkedInIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="navbar__option">
                        <a href="https://rsdimatulac.github.io/" style={{ textDecoration: "none" }}>
                            <ContactMailIcon fontSize="large" />
                        </a>
                    </div>
                </div>
                {showVideoModal && <VideoModal />}
                <div className="navbar__right">
                    {user ?
                    <>
                        <div className="navbar__info" onClick={goToProfile}>
                            <Avatar src={user?.profile_src} />
                            <h4>{user?.firstname} {user?.lastname}</h4>
                        </div>
                        <IconButton onClick={() => setShowDropdown(prevState => !prevState)} style={{ backgroundColor: "#eff2f5", borderRadius: "50%", padding: 12, marginRight: 10 }}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </>
                    :
                     <div className="navbar__info" >
                        <div className="filler"></div>
                     </div>
                     }
                </div>
                {/* {showCreatePostModal && <CreatePostModal user={user} />} */}
                {/* DROPDOWN */}
                {user && showDropdown &&
                    (<div className="dropdown__menu">
                        <div className="dropdown__header">
                            <div className="dropdown__avatar">
                                <img src={user?.profile_src} alt="" />
                            </div>
                            <div className="dropdown__name" onClick={goToProfile}>
                                <h4>{user?.firstname} {user?.lastname}</h4>
                                <p>See your profile</p>
                            </div>
                        </div>
                        <hr />
                        <a href="https://github.com/rsdimatulac/Flybook" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="dropdown__github">
                                <GitHubIcon />
                                <p>GitHub</p>
                            </div>
                        </a>
                        <hr />
                        <div className="dropdown__option">
                            <Brightness2Icon />
                            <p>Dark mode</p>
                        </div>
                        <a href="https://rsdimatulac.github.io/" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="dropdown__option">
                                <InfoIcon />
                                <p>About the developer</p>
                            </div>
                        </a>
                        <div className="dropdown__option" onClick={onLogout}>
                            <ExitToAppIcon />
                            <p>Logout</p>
                        </div>
                    </div>)}
            </nav>
            <div className="error__page">
                <div className="error__image"><img src={"https://www.facebook.com/images/comet/empty_states_icons/404/404_failed_loading_gray_wash.svg"} /></div>
                <div className="error__info">
                    <h1>This Page Isn't Available</h1>
                    <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
                    {user 
                    ? <div onClick={() => history.push(`/feed`)} className="link__buttons">Go to News Feed</div> 
                    : <div className="link__buttons" onClick={() => history.push(`/`)}>Login or Sign Up</div>
                    }
                    <div className="other__links">
                        <a href="https://github.com/rsdimatulac/Flybook" style={{ textDecoration: "none", color: "inherit" }}>
                            GitHub
                        </a>
                    </div>
                    <div className="other__links">
                        <a href="https://www.linkedin.com/in/renerosedimatulac/" style={{ textDecoration: "none", color: "inherit" }}>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;
