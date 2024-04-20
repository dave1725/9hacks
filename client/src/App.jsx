import React from "react";
import { Routes,Route } from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome.jsx';
import  About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import LoginLogistics from "./components/LoginLogistics.jsx";
import LoginRetailer from "./components/LoginRetailer.jsx";
import DashboardLog from "./components/DashboardLog.jsx";
import DashboardRet from "./components/DashboardRet.jsx";
import Review from "./components/Review.jsx";
import Commit from "./components/Commit.jsx";
import Status from "./components/Status.jsx";

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login-logistics" element={<LoginLogistics />}></Route>
        <Route path="/login-retailer" element={<LoginRetailer />}></Route>
        <Route path="/Dashboard-retailer" element={<DashboardRet/>}></Route>
        <Route path="/Dashboard-logistics" element={<DashboardLog/>}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/commit" element={<Commit />}></Route>
        <Route path="/status" element={<Status />}></Route>
      </Routes>
    </>
  );
}

