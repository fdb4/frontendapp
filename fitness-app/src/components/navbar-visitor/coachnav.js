import React, { useState } from "react";
import { Nav, NavLink, NavMenu, Bars, LoginButton, Logo, LogoImage, HamburgerMenu } from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../roles/visitors/assets/logo.png";
import { useAuth } from "./auth";

const CoachNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const auth = useAuth()

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
          <LoginButton to="/" activeStyle>
            LOGOUT
          </LoginButton>
        </NavMenu>
        {!auth.user && (
          <NavLink to="login" activeStyle>
            LOGIN
          </NavLink>
        )}

      </Nav>
    </>
  );
};

export default CoachNavbar;