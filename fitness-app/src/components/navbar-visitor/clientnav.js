import React, { useState } from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  Bars,
  LoginButton,
  Logo,
  LogoImage,
  DropdownLink,
  DropdownMenu,
  UserProfileImage
} from "./NavbarElements";

import logo from "../../roles/visitors/assets/logo.png";
import { useAuth } from "./auth";
import Cookies from "js-cookie";
import { useLocation, Navigate } from "react-router-dom";
import MyProfileIcon from "./icons/account.png";
import EditProfileIcon from "./icons/user-avatar.png";
import InboxIcon from "./icons/notification.png";
import Messages from "./icons/messages.png";
import SettingsIcon from "./icons/settings.png";
import LogoutIcon from "./icons/leave.png";
import Profile from "./icons/profile.jpg"

const ClientNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { setAuth } = useAuth();
  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("role");
    setAuth({});
    console.log("Done");
    Navigate("/");
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <>
      <Nav>
        <Logo>
          <LogoImage src={logo} alt="Your Logo" className="invert-logo" />
        </Logo>
        <Bars onClick={toggleMenu} />
        <NavMenu showMenu={showMenu}>
        <NavLink to="/clienthome" activeStyle>
            HOME
          </NavLink>
          <NavLink to="/dailyactivity" activeStyle>
            DAILY ACTIVITY
          </NavLink>
          <NavLink to="/workouts" activeStyle>
            WORKOUTS
          </NavLink>
          <NavLink to="/clientcoaches" activeStyle>
            COACHES
          </NavLink>
          <div style={{ position: "relative"}}>
            <UserProfileImage
              src={MyProfileIcon}
              alt="User Profile"
              onClick={toggleProfileMenu}
            />
            <DropdownMenu show={showProfileMenu}>
              <DropdownLink to="/myprofile">
                <img src={MyProfileIcon} alt="My Profile Icon" />
                My Profile
              </DropdownLink>
              <DropdownLink to="/inbox">
                <img src={InboxIcon} alt="Inbox Icon" />
                Inbox
              </DropdownLink>
              <DropdownLink to="/messages">
                <img src={Messages} alt="Inbox Icon" />
                Messages
              </DropdownLink>
              <DropdownLink to="/settings">
                <img src={SettingsIcon} alt="Settings Icon" />
                Settings
              </DropdownLink>
              <DropdownLink to="/" onClick={handleLogout}>
                <img src={LogoutIcon} alt="Logout Icon" />
                Logout
              </DropdownLink>
            </DropdownMenu>
          </div>
        </NavMenu>
      </Nav>
    </>
  );
};

export default ClientNavbar;
