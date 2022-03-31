import React from "react";
import Set from "./Set";
import "../Month.css"
import CalendarState from "../context/CalendarContext";
import Header from "./Calendar/Header";
import Calendar from "./Calendar/Calendar";
import TaskForm from "./Calendar/TaskForm";

const Month = () => {
    return <div style={{
        padding: '70px 30px 0px 280px'
    }}>
        <Set />

        <div className={"container"}>
            <CalendarState>
                <Header />
                <Calendar />
                <TaskForm/>
            </CalendarState>
            <button className={"monthexport"}>
                Export to Google Calendar
            </button>
        </div>

    </div>;
};

export default Month;
