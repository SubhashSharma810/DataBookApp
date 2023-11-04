import React from "react";
import Home from "./component/Home";
import Report from "./component/Report";
import Login from "./component/Login";
import {  useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import SignUp from "./component/SignUp";
import "./App.css";
import Footer from "./component/Footer";

function App() {
  let navigation = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigation('/')
    }
    if (!authToken) {
      navigation('/login')
    }
  }, []);



  return (
    <div>
      

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>


    </div>
  );
}

export default App;
