import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css";

const NavBar = ({ user }) => {  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/feed" activeClassName="active">
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user.id}`} activeClassName="active">
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
