import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Day, Detail, Home, LogIn, Month, Navigation, Set, Todo, Week} from "./component";


function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/detail" element={<Detail/>}/>
                <Route path="/day" element={<Day/>}/>
                <Route path="/set" element={<Set/>}/>
                <Route path="/week" element={<Week/>}/>
                <Route path="/month" element={<Month/>}/>
                <Route path="/todo" element={<Todo/>}/>
            </Routes>
        </div>
    );
}

export default App;
