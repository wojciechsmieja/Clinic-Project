import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.js';
import { PrivateRoute } from "./PrivateRoute";
import AdminPanel from './pages/AdminPanel.js';
import DoctorPanel from "./pages/DoctorPanel.js";
import RegisterPanel from "./pages/RegisterPanel";
import LabTechPanel from "./pages/LabTechPanel.js";
import LabManagerPanel from "./pages/LabManagerPanel.js";
import Navbar from "./components/navbar.js";
import VisitDetails from './pages/VisitDetails.js';
import './App.css';

//component for handling redirects after logging in
const Home = () => {
  const navigate = useNavigate();
  React.useEffect(()=>{
    const rola = localStorage.getItem("role");
    console.log("Rola z localStorage: ", rola);
    switch (rola){
      case "ROLE_LEKARZ":
        navigate("/doctor");
        break;
      case "ROLE_REJESTRATOR":
        navigate("/register");
        break;
      case "ROLE_LABORANT":
        navigate("/labTech");
        break;
      case "ROLE_KIEROWNIK":
        navigate("/labManager");
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
      default:
        navigate("/login");
        break;
    }
  }, [navigate]);
  return <div className='redirectInfo'>Przekierowywanie...</div>;
};

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/*Main page*/ }
          <Route path="/" element={<Home />} />
          {/*Logging page*/ }
          <Route path="/login" element={<Login onLogin={()=>window.location.href = '/'}/>} />
          {/*Private routes*/ }
          <Route path="/doctor" element={
            <PrivateRoute allowedRoles={["ROLE_LEKARZ"]}><DoctorPanel/></PrivateRoute>
          }/>
          <Route path="/register" element={
            <PrivateRoute allowedRoles={["ROLE_REJESTRATOR"]}><RegisterPanel/></PrivateRoute>
          }/>
          <Route path="/labtech" element={
            <PrivateRoute allowedRoles={["ROLE_LABORANT"]}><LabTechPanel/></PrivateRoute>
          }/>
          <Route path="/labmanager" element={
            <PrivateRoute allowedRoles={["ROLE_KIEROWNIK"]}><LabManagerPanel/></PrivateRoute>
          }/>
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN"]}><AdminPanel/></PrivateRoute>
          }/>
          <Route path="/visit/:id" element={
            <PrivateRoute allowedRoles={["ROLE_LEKARZ"]}><VisitDetails/></PrivateRoute>
          }/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
