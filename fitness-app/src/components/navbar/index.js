import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/movies" activeStyle>
                        Movies
                    </NavLink>
                    <NavLink to="/customers" activeStyle>
                        Customer
                    </NavLink>
                    <NavLink to="/report" activeStyle>
                        Reports
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;