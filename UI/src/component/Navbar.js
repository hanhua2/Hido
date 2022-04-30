import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
    let userEmail = props.email;
    const google = props.google;
    return (
        <div className="bar">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" >
                                    HOME
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/account"  state={{email: userEmail, google: google}}>
                                    ACCOUNT
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
    );
}

export default Navbar;
