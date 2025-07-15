//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import Login from './components/Login';
import VisitForm from './components/VisitForm';
import AdminPanel from './components/AdminPanel';
//import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Clinic</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/addVisit" element={<VisitForm />}/>
          <Route path="/adminPanel" element={<AdminPanel/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
