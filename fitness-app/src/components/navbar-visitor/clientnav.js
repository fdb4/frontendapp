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
  UserProfileImage,
} from "./NavbarElements";
import AdminDropdown from './AdminDropdown';
import logo from "../../roles/visitors/assets/logo.png";
import { useAuth } from "./auth";
import Cookies from "js-cookie";
import { useLocation, Navigate } from "react-router-dom";
import MyProfileIcon from "./icons/account.png";
import InboxIcon from "./icons/notification.png";
import Messages from "./icons/messages.png";
import SettingsIcon from "./icons/settings.png";
import LogoutIcon from "./icons/leave.png";

const ClientNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const role = Cookies.get('role')
  const isAdmin = Cookies.get('isAdmin')
  const { setAuth } = useAuth();
  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("role");
    Cookies.remove("isAdmin")
    setAuth({});
    console.log("Done");
    Navigate("/");
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const toggleAdminDropdown = () => {
    console.log("Toggle Admin Dropdown");
    setShowAdminDropdown(!showAdminDropdown);
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
            Home
          </NavLink>
          <NavLink to="/dailylog" activeStyle>
            Daily Log
          </NavLink>
          <NavLink to="/workouts" activeStyle>
            Workouts
          </NavLink>
          <NavLink to="/clientcoaches" activeStyle>
            Coaches
          </NavLink>
          {role === "Coach" && (
          <NavLink to="/coachhome" activeStyle>
            Your Clients
          </NavLink>
        )}
        {isAdmin === 'true' && (
          <div
            className="nav-link"
             // Add any necessary styles for the cursor
            onClick={toggleAdminDropdown}
            style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', }}
          >
            Admin
            {showAdminDropdown && <AdminDropdown />}
          </div>
        )}
          <div style={{ position: "relative" }}>
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
