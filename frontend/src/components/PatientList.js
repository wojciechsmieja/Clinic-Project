import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosInstance from './axiosInstance'

function PatientList(){
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    //form:
    const [formData, setFormData] = useState({
        name:'',
        surname: '',
        pesel: '',
        dateOfBirth: '',
        email:''
    });

    //taking data [json] fron backend
    useEffect(()=>{
        axiosInstance('/patients')
            .then(response=>{
                console.log("Odpowidz z API", response.data);
                setPatients(response.data);})
            .catch(error=>{
                console.error("Błąd podczas pobierania listy pacjentów");
                alert("Coś poszło nie tak podczas pobierania listy pacjentów :(");
            });
    }, []);

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];
        if (formData.dateOfBirth > today) {
            alert("Data urodzenia nie może być z przyszłości!");
            return;
        }

        if (formData.pesel.length !== 11 || !/^\d+$/.test(formData.pesel)) {
            alert("PESEL musi mieć dokładnie 11 cyfr!");
            return;
        }        

        axiosInstance.post('/patients', formData)
            .then(resonse =>{
                setPatients(prev => [...prev, resonse.data]);

                setFormData({
                    name:'',
                    surname:'',
                    pesel:'',
                    dateOfBirth:'',
                    email:''
                });
            })
            .catch(error => {
                console.error("Błąd podczas dodawania pacjenta",error);
                alert("Błąd podczas dodawania pacjenta :(");
            });
        }; 
        
    //delete
    function handleDelete(id){
        if (window.confirm("Czy na pewno chcesz usunąć tego pacjenta?")) {
        axiosInstance.delete(`/patients/${id}`)
        .then(response => {
            if (response.status ===204 || response.status ===200) {
                setPatients(prev => prev.filter(p => p.id !== id));
                if (selectedPatient && selectedPatient.id === id) {
                    setSelectedPatient(null);
                }
            } else {
                alert("Błąd przy usuwaniu pacjenta.");
            }
        })
        .catch(error => {
            console.error("Błąd przy usuwaniu pacjenta",error);
            alert("Błąd przy usuwaniu pacjenta");
        });
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>List of Patients</h2>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.name}, {patient.surname}
                        <button onClick={() => setSelectedPatient(patient)}>
                            Show details
                        </button>
                        <button onClick = {()=> handleDelete(patient.id)} style={{marginLeft: '10px', color: 'red'}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div style={{ marginTop: '20px', border: '1px solid gray', padding: '10px' }}>
                    <h3>Patient's details</h3>
                    <p><strong>Imię:</strong> {selectedPatient.name}</p>
                    <p><strong>Nazwisko:</strong> {selectedPatient.surname}</p>
                    <p><strong>PESEL:</strong> {selectedPatient.pesel}</p>
                    <p><strong>Data urodzenia:</strong> {selectedPatient.dateOfBirth}</p>
                    <p><strong>Email:</strong> {selectedPatient.email}</p>
                </div>
            )}

            <div style={{ marginTop: '40px' }}>
                <h3>Add New Patient</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Imię:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Nazwisko:</label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>PESEL:</label>
                        <input type="text" name="pesel" value={formData.pesel} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Data urodzenia:</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Dodaj pacjenta</button>
                </form>
            </div>
        </div>
    );




}
export default PatientList;
