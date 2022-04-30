import React, { useState } from "react";
import Set from "./Set";
import Navbar from "./Navbar";
import "../Day.css"
import {MusicPlayer} from "./index";
import {useLocation} from 'react-router-dom';

function Account() {
    const { state } = useLocation();
    let userEmail;
    if (state != null) {
        userEmail = state.email;
    }
    
    return (
        <>
            <Navbar email = {userEmail} />
            <MusicPlayer/>
            <div className="day-block"></div>
            <div className="todoapp stack-large" id="resize">

                <Set email = {userEmail} />

                <h2 style={{"text-align": "left"}}>Getting Started</h2>
                <h4 style={{"text-align": "left"}}>🐱‍🐉Welcome to Hido</h4>
                <h4 style={{"text-align": "left"}}>🙌Here are some tips for you to enjoy Hido</h4>
                <h5 style={{"text-align": "left"}}>👂Click the play on the right to enjoy some music</h5>
                <h5 style={{"text-align": "left"}}>🙋‍♀️You can Click on Day to write down your tasks for today!</h5>
                <h5 style={{"text-align": "left"}}>📅You can also Click on Month to make a plan for the following
                    days</h5>
                <h4 style={{"text-align": "left"}}>🎉Enjoy your trip!</h4>

            </div>
            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>
        </>
    )
}


export default Account;



