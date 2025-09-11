import React from 'react';
import PatientList from '../components/PatientList';
import VisitForm from '../components/VisitForm';
import "./RegisterPanel.css";

function RegisterPanel(){
    return (
        <div>
            <h1 className='header-register'>Panel Rejestratora</h1>
            <div className='main-container'>                                                         
                <div className='patient-list-register'>
                    <PatientList/>
                </div>
                <div className='visit-form-parent' >
                    <VisitForm />
                </div>                 
            </div>
        </div>
    );
}
export default RegisterPanel;