import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
 
export const Nav = styled.nav`
  background: black;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;


export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    background: black;
    transition: all 0.3s ease;
  }
`;

export const LoginButton = styled(Link)`
  color: #A16551;
  background: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 50%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

export const HamburgerMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;