import React, {useEffect, useState} from 'react';

function PatientList(){
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(()=>{
        fetch('/api/patients')
            .then(response=>response.json())
            .then(data=>setPatients(data));
    }, []);

    return(
        <div style={{padding: '20px'}}>
            <h2>List of Patienst</h2>
            <ul>
                {patients.map(patient=>(
                    <li key={patient.id}>
                        {patient.name},{patient.surname}
                        <button onClick={()=>setSelectedPatient(patient)}>
                            Show details
                        </button>
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div style ={{marginTop:'20px',border: '1px solid gray', padding:'10px'}}>
                    <h3>Patient's details</h3>
                    <p><strong>Imię:</strong> {selectedPatient.name}</p>
                    <p><strong>Nazwisko:</strong> {selectedPatient.surname}</p>
                    <p><strong>PESEL:</strong> {selectedPatient.pesel}</p>
                    <p><strong>Data urodzenia:</strong> {selectedPatient.dateOfBirth}</p>
                    <p><strong>Email:</strong> {selectedPatient.email}</p>
                </div>    


            )}
        </div>
    );




}
export default PatientList;
