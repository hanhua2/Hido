import React from "react";
import '../Month.css';
import Week from "./Week";
import Set from "./Set";

const Month = () => {
    return <div style={{
        padding: '70px 30px 0px 280px'
    }}>
        <Set />
        <h3 style={{textAlign:"left", margin:"-20px"}}>2022.2 DDL List</h3>
        <button style={{margin:"20px 20px 20px 800px"}}>Export to Google Calendar</button>
        <Week />
    </div>;
};

export default Month;
