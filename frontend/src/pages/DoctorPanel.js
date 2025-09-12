import React from "react";
import Visit from '../components/Visit';
import { Container } from 'react-bootstrap';

function DoctorPanel(){

    return (
        <Container className="my-4">
            <h1 className="mb-4">Panel Lekarza</h1>
            <Visit/>
        </Container>
    )

}

export default DoctorPanel;