import React from "react";
import { Nav, NavLink, NavMenu, Bars } from "./NavbarElements"; // Import Bars
import { LoginButton, Logo,  LogoImage} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
      <Logo>
          <LogoImage src="./logo.png" alt="Your Logo" />
        </Logo>
        <Bars />
        <NavMenu>
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
