import React from 'react';
import PatientList from '../components/PatientList';
import VisitForm from '../components/VisitForm';

function RegisterPanel(){
    return (
        <div>
            <h1 className='header-register'>Panel Rejestratora</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around', padding: '20px' }}>                                                         
                <div style={{ flex: 1, marginRight: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} className='patient-list-register'>
                    <PatientList/>
                </div>
                    <div style={{ flex: 1, marginLeft: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                        <VisitForm />
                    </div>                 
            </div>
        </div>
    );
}
export default RegisterPanel;