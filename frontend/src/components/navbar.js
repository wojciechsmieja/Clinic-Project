import React from "react";
import { useNavigate } from "react-router-dom";
import './navbar.css';

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };
    return(
        <div className="navbar">
          <h2>Przychodnia</h2>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
    );       
    
}

export default Navbar;