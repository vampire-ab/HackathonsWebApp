import React from "react";
import "./navbar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/icons/DPhi Logo.png'
import { useNavigate } from "react-router";
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar nav">
      <div className ="navbar-brand" href="#" style={{marginLeft:"30px"}}>
        <img
          src = {logo}
          width="50"
          height="50"
          className ="d-inline-block align-center"
          alt=""
          onClick = {() => navigate("/")}
          style = {{cursor: "pointer"}}
        />
       <span style={{marginLeft:"18px"}}>DPhi</span> 
      </div>
    </nav>
  );
}

export default Navbar;
