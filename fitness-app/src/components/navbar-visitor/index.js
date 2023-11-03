import React, { useState } from "react";
import { Nav, NavLink, NavMenu, Bars, LoginButton, Logo, LogoImage, HamburgerMenu } from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../roles/visitors/assets/logo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Nav>
        <Logo>
          <LogoImage src="{logo}" alt="Your Logo" />
        </Logo>
        <Bars onClick={toggleMenu} />
        <NavMenu showMenu={showMenu}>
          <NavLink to="/" activeStyle>
            HOME
          </NavLink>
          <NavLink to="/services" activeStyle>
            SERVICES
          </NavLink>
          <NavLink to="/our-team" activeStyle>
            OUR TEAM
          </NavLink>
          <NavLink to="/about" activeStyle>
            ABOUT
          </NavLink>
          <LoginButton to="/login" activeStyle>
            LOGIN
          </LoginButton>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
