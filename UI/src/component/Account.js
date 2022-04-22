import React from "react";
import Set from "./Set";
import Navbar from "./Navbar";
import "../Day.css"

function Account(){
    return (
        <>
        <Navbar/>
        <div className="todoapp stack-large" id = "resize">

            <Set/>

            <h2 style={{"text-align":"left"}}>Getting Started</h2>
            <h4 style={{"text-align":"left"}}>🐱‍🐉Welcome to Hido</h4>
            <h4 style={{"text-align":"left"}}>🙌Here are some tips for you to enjoy Hido</h4>
            <h5 style={{"text-align":"left"}}>👂Click on Music to enjoy some music</h5>
            <h5 style={{"text-align":"left"}}>🙋‍♀️You can Click on Day to write down your tasks for today!</h5>
            <h5 style={{"text-align":"left"}}>📅You can also Click on Month to make a plan for the following days</h5>
            <h4 style={{"text-align":"left"}}>🎉Enjoy your trip!</h4>

        </div>
        </>
    )
}


export default Account;



