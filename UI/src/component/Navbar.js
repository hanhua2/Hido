import React from "react";
import { NavLink } from "react-router-dom";
import '../Navbar.scss'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    HOME
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/account">
                                    ACCOUNT
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    );
}

export default Navbar;
