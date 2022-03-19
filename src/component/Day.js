import React from "react";
import '../Month.css';
import Set from "./Set";
import Week from "./Week";

const Day = () => {
    return <div style={{
        padding: '70px 30px 0px 280px'
    }}>
        <Set />
        <h3 style={{textAlign:"left", margin:"-20px"}}>2022.2.24 To do List</h3>
        <button style={{margin:"20px 20px 20px 800px"}}>Sort</button>
        <button >Export</button>
        <Week />
    </div>;
};

export default Day;
