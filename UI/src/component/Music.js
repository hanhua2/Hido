import "../Day.css"
import Navbar from "./Navbar";
import Set from "./Set";
import React from "react";
import {MusicPlayer} from "./index";

function Music() {
    return (
        <>
            <Navbar/>
            <div>
                <Set/>
                <MusicPlayer/>
            </div>

        </>
    )
}


export default Music;
