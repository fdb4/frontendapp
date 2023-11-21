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
  width: 150px;
  height: 100px;
  margin-right: 10px;
`;


export const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;


export const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    margin-right: 8px; 
    max-width:20px;
    opacity: 0.5;
    transiton: var(--speed);
  }
`;

export const UserProfileImage = styled.img`
  width: 30px; // Adjust the size as needed
  height: 30px; // Adjust the size as needed
  border-radius: 50%;
  cursor: pointer;
  filter: invert(100%)
`;