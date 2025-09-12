import React from 'react';
import PatientList from '../components/PatientList';
import VisitForm from '../components/VisitForm';
import { Container, Tabs, Tab } from 'react-bootstrap';
import './RegisterPanel.css';

function RegisterPanel() {
    return (
        <Container fluid className="p-4">
            <h1 className='mb-4'>Panel Rejestratora</h1>
            {/* Add the wrapper div with the class name */}
            <div className="register-panel-tabs"> 
                <Tabs defaultActiveKey="patients" id="register-panel-tabs" justify>
                    <Tab eventKey="patients" title="Zarządzanie Pacjentami">
                        <PatientList />
                    </Tab>
                    <Tab eventKey="visits" title="Rejestracja Wizyty">
                        <VisitForm />
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
}

export default RegisterPanel;