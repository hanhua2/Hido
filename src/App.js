import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {
  Home,
  LogIn,
  Page1,
  Navigation
} from "./component";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/login" element={<LogIn />} />
        <Route path ="/page1" element={<Page1 />} />
      </Routes>
    </div>
  );
}

export default App;
