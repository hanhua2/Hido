import React from 'react';
import './App.css';
import {Routes} from "react-router-dom"
import {Route} from "react-router";
import {Day, Home, LogIn, Month, Navigation, Register, Account, Music} from "./component";


function App() {
    return (
        <div className="App" fixed = "top">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/day" element={<Day/>}/>
                    <Route path="/month" element={<Month/>}/>
                </Routes>
        </div>
    );
}

export default App;
