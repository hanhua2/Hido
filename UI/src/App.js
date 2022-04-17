import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Day, Home, LogIn, Month, Navigation, Register} from "./component";

function App() {
    return (
        <div className="App">
            <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/day" element={<Day/>}/>
                    <Route path="/month" element={<Month/>}/>
                </Routes>
        </div>
    );
}

export default App;
