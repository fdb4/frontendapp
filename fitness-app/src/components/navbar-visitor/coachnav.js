import React, { useState } from "react";
import { Nav, NavLink, NavMenu, Bars, LoginButton, Logo, LogoImage, HamburgerMenu } from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../roles/visitors/assets/logo.png";
import { useAuth } from "./auth";
import Cookies from 'js-cookie';
import { useLocation, Navigate } from "react-router-dom"

const CoachNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { setAuth } = useAuth()
  const handleLogout = () => {
    Cookies.remove('accessToken')
    setAuth({})
    console.log('Done')
    Navigate("/")
  }

  return (
    <>
      <Nav>
        <Logo>
          <LogoImage src={logo} alt="Your Logo"  className="invert-logo"/>
        </Logo>
        <Bars onClick={toggleMenu} />
        <NavMenu showMenu={showMenu}>
          <NavLink to="/clienthome" activeStyle>
            HOME
          </NavLink>
          <NavLink to="/dailyactivity" activeStyle>
            DAILY ACTIVITY
          </NavLink>
          <NavLink to="/messages" activeStyle>
            MESSAGES
          </NavLink>
          <NavLink to="/workouts" activeStyle>
            WORKOUTS
          </NavLink>
          <NavLink to="/clientcoaches" activeStyle>
            COACHES
          </NavLink>
          <NavLink to="/clients" activeStyle>
            CLIENTS
          </NavLink>
          <NavLink to="/settings" activeStyle>
            SETTINGS
          </NavLink>
          <LoginButton onclick={handleLogout} activeStyle>
            LOGOUT
          </LoginButton>
        </NavMenu>
      </Nav>
    </>
  );
};

export default CoachNavbar;