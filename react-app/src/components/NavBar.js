import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AddIcon from "@material-ui/icons/Add";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, IconButton } from "@material-ui/core";
import Brightness2Icon from '@material-ui/icons/Brightness2';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useConsumeContext from "../context/ModalContext";
import { logout } from "../store/session";
import "./NavBar.css";


const NavBar = ({ user }) => {
  const { showDropdown, setShowDropdown } = useConsumeContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = async () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const goToProfile = () => {
    setShowDropdown(false);
    history.push(`/users/${user?.id}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink to="/feed">
          <div className="navbar__logo">
            <img src="https://theflybook.s3.amazonaws.com/facebook_logo.png" alt="" />
          </div>
        </NavLink>
        <div className="navbar__search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Flybook"
          />
        </div>
      </div>
      <div className="navbar__middle">
        <div className="navbar__option navbar__option--active">
          <HomeIcon fontSize="large" />
        </div>
        <div className="navbar__option">
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
      <div className="navbar__right">
        <div className="navbar__info" onClick={goToProfile}>
          <Avatar src={user?.profile_src} />
          <h4>{user?.firstname} {user?.lastname}</h4>
        </div>
        <IconButton style={{ backgroundColor: "#eff2f5", borderRadius: "50%", padding: 12, marginRight: 10 }}>
          <AddIcon />
        </IconButton>
        <IconButton style={{ backgroundColor: "#eff2f5", borderRadius: "50%", padding: 12, marginRight: 10 }}>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton onClick={() => setShowDropdown(prevState => !prevState)} style={{ backgroundColor: "#eff2f5", borderRadius: "50%", padding: 12, marginRight: 10 }}>
          <ExpandMoreIcon />
        </IconButton>
      </div>
      {showDropdown &&
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
              <GitHubIcon/>
              <p>GitHub</p>
            </div>
          </a>
          <hr />
          <div className="dropdown__option">
            <Brightness2Icon/>
            <p>Dark mode</p>
          </div>
          <a href="https://rsdimatulac.github.io/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="dropdown__option">
              <InfoIcon/>
              <p>About the developer</p>
            </div>
          </a>
          <div className="dropdown__option" onClick={onLogout}>
            <ExitToAppIcon/>
            <p>Logout</p>
          </div>
        </div>)}
    </nav>
  );
}

export default NavBar;
