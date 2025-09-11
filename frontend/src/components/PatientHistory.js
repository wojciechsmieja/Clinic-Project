import React, { useState,useEffect } from 'react'
import axiosInstance from './axiosInstance'

function PatientHistory({patientId, currentVisitId}) {  
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!patientId) {
            setLoading(false);
            return;
        }
        const fetchHistory = async () => {
            try {
                const response = await axiosInstance.get(`/visits/by-patient/${patientId}`);
                    const filteredHistory = response.data.filter(visit => visit.id_wiz !== currentVisitId);
                    const sortedHistory = filteredHistory.sort((a,b)=>new Date(a.data_wiz) - new Date(b.data_wiz));
                    setHistory(sortedHistory);
            } catch (err) {
                setError('Nie udało się załadować historii wizyt.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [patientId, currentVisitId]);

    if(loading){
      return <p>Ładowanie historii pacjenta...</p>
    }

    if(error){
      return <p style={{color:'red'}}>{error}</p>
    }

    return(
      <div className='patient-history-container'>
        <h2>Wcześniejsze wizyty pacjenta</h2>
        {history.length>0 ? (
          <ul className='patient-history-ul'>
            {history.map(visit=>(
              <li key={visit.id_wiz}>
                <p>Data wizyty: {new Date(visit.data_wiz).toLocaleString()}</p>
                <p>Opis: {visit.opis}</p>
                <p>Diagnoza: {visit.diagnoza}</p>
                {visit.physicalExams>0 && visit.physicalExams && (
                  <div className='history-physcial-exams'>
                    <p>Wykonane badania fizykalne:</p>
                    <ul>
                      {visit.physicalExams.map((exam, index)=>(
                        <li key={`phy-${index}`}>{exam.name}: <strong>{exam.result}</strong></li>
                      ))}
                    </ul>
                  </div>
                )}
                {visit.labExams>0 && visit.labExams && (
                  <div className='history-lab-exams'>
                    <p>Wykonane badania laboratoryjne:</p>
                    <ul>
                      {visit.lab.map((exam, index)=>(
                        <li key={`lab-${index}`}>
                          {exam.name} - (Status: {exam.status})
                          {exam.status==='Zatwierdzone' && <p> - Wynik: <strong>{exam.result}</strong></p>}
                          {exam.status==='Anulowane' && exam.cancelReason && <p style={{color:'red'}}>- Powód: {exam.cancelReason}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}                
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak wcześniej zakończonych wizyt</p>
        )}
      </div>
    );
}
export default PatientHistory;

