import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../components/axiosInstance'
import PhysicalExamForm from '../components/PhysicalForm';
import LabExamForm from '../components/labExamForm';
import "./VisitDetails.css";

function VisitDetails() {
    const {id} = useParams();    
    const navigate = useNavigate();
    const [visit, setVisit] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {                                                         
      axiosInstance.get(`visits/${id}`)                                      
        .then(response => {                   
          const visitData = response.data;                                
          setVisit(visitData);     
          setDiagnosis(visitData.diagnosis || '');           
          console.log(visitData.labExams)     ;                       
        })                                                                    
        .catch(error => {                                                     
          console.error("Błąd podczas pobierania szczegółów wizyty!", error); 
          setMessage('Błąd podczas ładowania wizyty');
        });                                                                   
    }, [id]);   

    const handleUpdate = () => {
        setMessage('Zapisywanie...');
        alert("zapisywanie");
        axiosInstance.patch(`visits/${id}`, {diagnosis: diagnosis})
            .then(response => {
                setMessage('Diagnoza została zaktualizowana');
                setTimeout(()=>setMessage(''),3000);
            })
            .catch(error => {
                console.error("błąd podczas aktualizacji wizyty", error);
                setMessage('Błąd aktualizacji wizyty. Spróbuj ponownie');
            });
        
    }

    const handleEndVisit = () => {
        setMessage('Zakańczanie wizyty...');
        const payload = {
            diagnosis: diagnosis,
            status: 'Zakończona'
        };
        axiosInstance.patch(`/visits/${id}`, payload)
            .then(response => {
                setMessage('Wizyta została zakończona pomyślnie.');
                setTimeout(()=>{
                    navigate('/doctor');
                }, 2000);
            })
            .catch(error => {
                console.error('Błąd podczas końćzenia wizyty!', error);
                setMessage('Błąd przy zakańczaniu wizyty. Spróbuj ponownie');
            });
    }
/*
    const handleExamAdded = (newExam) => {
        setVisit(prevVisit =>{
            const examDto={
                code: newExam.code.code,
                name:newExam.code.name,
                result: newExam.result
            };
            return {
            ...prevVisit,
            physicalExams:[...PhysicalExamForm(prevVisit.physicalExams || []), examDto]
            }
        });
    }
*/
    if(!visit){
        return <div>Ładowanie danych wizyty...</div>
    }

    return (
        <div>
            <h1>Zrealizuj wizytę</h1>
            <p>Szczegóły wizyty dla pacjenta: <strong>{visit.patient?.name} {visit.patient?.surname}</strong></p>

            <div className='main-container'>
                <div className='visit-form'>
                    <form>
                        <h2>Uzupełnij dane</h2>
                        <ul>
                            <li key={visit.id_wiz}>
                             <p>Opis: {visit.opis}</p>
                             <label htmlFor='diagnosis'>Diagnoza</label>
                             <textarea
                                id='diagnosis'
                                name='diagnosis'
                                rows="5"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                style={{width:'60%', marginTop: '10px'}}/>
                             {message && <p style={{marginTop: '10px', color: 'blue'}}>{message}</p>}
                             <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                             <button onClick={handleUpdate} className='change-visit'>Aktualizuj</button>
                             <button onClick={handleEndVisit} className='end-visit'>Zakończ wizytę</button>
                             </div>
                            </li> 
                        </ul>
                    </form>
                </div>
            </div>
            <div className='added-physical-exams'>
                {visit.physicalExams && visit.physicalExams.length >0 &&(
                    <div className='completed-exams'>
                        <h2>Wykonane badania fizykalne</h2>
                        <ul style={{listStyleType: 'none', padding: '0'}}>
                            {visit.physicalExams.map((exam, index)=>(
                            <li key={index} style={{background: '#f9f9f9', border: '1px solid #ddd', padding: '10px', marginBottom:'10px', borderRadius: '10px'}}>
                                <strong>{exam.name}</strong>
                                <p>Wynik: {exam.result}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className='added-lab-exams'>
                {visit.labExams && visit.labExams.length >0 &&(
                    <div className='completed-exams'>
                        <h2>Wykonane badania laboratoryjne</h2>
                        <ul style={{listStyleType: 'none', padding: '0'}}>
                            {visit.labExams.map((exam, index)=>(
                            <li key={index} style={{background: '#f9f9f9', border: '1px solid #ddd', padding: '10px', marginBottom:'10px', borderRadius: '10px'}}>
                                <strong>{exam.name}</strong>
                                <span style={{ background: '#e0e0e0', padding: '2px 8px', borderRadius:'10px', fontSize: '12px' }}>
                                    Status: {exam.status}
                                </span>
                                {exam.doctorNotes && <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Uwagi: {exam.doctorNotes}</p>}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className='add-exams'>
                <div className='add-physical-exam'>
                    <PhysicalExamForm visitId={id}/>
                </div>
                <div className='add-lab-exam'>
                    <LabExamForm visitId={id}/>
                </div>
            </div>
        </div>
    )
}
export default VisitDetails;