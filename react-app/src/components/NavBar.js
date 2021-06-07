import React, { useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Search from "./Search";
import { getUser } from "../store/user"
import { getAllUsers } from "../store/users";
import { logout } from "../store/session";
import "./NavBar.css";


const NavBar = ({ user }) => {
  const users = useSelector(state => state.users);
  const stateUser = useSelector(state => state.user);
  const theUser = stateUser[user.id]
  const { showDropdown, setShowDropdown, searchInput, setSearchInput, setSearchResults, showSearch, setShowSearch } = useConsumeContext();

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

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchInput("");
      setSearchResults([]);
    };

    if (e.target.value.length > 0) { 
      let filteredResults = Object.values(users).filter(user => 
        user['firstname']?.toLowerCase().includes(e.target.value.toLowerCase())
        || user['lastname']?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchInput(e.target.value);
      setSearchResults(filteredResults);
    };
  };

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getUser(user?.id))
  }, [dispatch, user.id]);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink to="/feed">
          <div className="navbar__logo">
            <img src="https://theflybook.s3.amazonaws.com/facebook_logo.png" alt="" />
          </div>
        </NavLink>
        {/* SEARCH INPUT */}
        <div className="navbar__search" onClick={() => setShowSearch(prevState => !prevState)}>
          <SearchIcon />
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search Flybook"
            onChange={handleSearch}
            value={searchInput}
          />
        </div>
      </div>
      {/* SEARCH RESULTS HERE */}
      {showSearch ? <Search currentUser={user} /> : null}

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
          <Avatar src={theUser?.profile_src} />
          <h4>{theUser?.firstname} {theUser?.lastname}</h4>
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
      {/* DROPDOWN */}
      {showDropdown &&
        (<div className="dropdown__menu">
          <div className="dropdown__header">
            <div className="dropdown__avatar">
              <img src={theUser?.profile_src} alt="" />
            </div>
            <div className="dropdown__name" onClick={goToProfile}>
              <h4>{theUser?.firstname} {theUser?.lastname}</h4>
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
  );
}

export default NavBar;
