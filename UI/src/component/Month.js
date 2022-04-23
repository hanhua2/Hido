import React from "react";
import Set from "./Set";
import "../Month.css"
import CalendarState from "../context/CalendarContext";
import Header from "./Calendar/Header";
import Calendar from "./Calendar/Calendar";
import TaskForm from "./Calendar/TaskForm";
import Navbar from "./Navbar";
import {MusicPlayer} from "./index";

const Month = () => {
    return (
        <>
            <Navbar/>
            <MusicPlayer/>
            <div style={{padding: '150px 100px 65px 0px'}}>
                <Set/>
                <div className={"container"}>
                    <CalendarState>
                        <Header/>
                        <Calendar/>
                        <TaskForm/>
                    </CalendarState>
                    <button className={"monthexport"}>
                        Export to Google Calendar
                    </button>
                </div>

            </div>
            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>
        </>)
};

export default Month;
