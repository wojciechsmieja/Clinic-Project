import React, {useState, useEffect} from 'react';
import axiosInstance from '../components/axiosInstance';
import './LabTechPanel.css';

const LabTechPanel = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [actionState, setActionState] = useState({
        examId: null, 
        actionType: null, 
        inputValue: '',
        submitting: false,
    });

    useEffect(() => {
        fetchOrderedExams();
    }, []);

    const fetchOrderedExams = () =>{
        setLoading(true);
        axiosInstance.get("/labtech/exams/ordered")
            .then(response => {
                const examsWithId = response.data.map(exam => ({...exam, id: exam.id})); 
                setExams(examsWithId);
            })
            .catch(err => {
                console.error("Błąd podczas pobierania zleconych badań", err);
                setError('Nie udało się załadować badań. Spróbuj ponownie później.');
            })
            .finally(() => {
                setLoading(false);
            });           
    }
    const handleActionClick = (examId, type) => {
        setActionState({ examId: examId, actionType: type, inputValue: '', submitting: false });
    };

    const handleConfirmAction = () => {
        if (!actionState.inputValue) {
            alert('Pole nie może być puste!');
            return;
        }
        setActionState(prev => ({ ...prev, submitting: true }));

        const { examId, actionType, inputValue } = actionState;
        const url = `/labtech/exams/${examId}/${actionType}`;
        const payload = actionType === 'complete' ? { result: inputValue } : { reason: inputValue };

        axiosInstance.patch(url, payload)
            .then(response => {
                setExams(prevExams => prevExams.filter(exam => exam.id !== examId));
                setActionState({ examId: null, actionType: null, inputValue: '', submitting: false });
            })
            .catch(err => {
                console.error(`Błąd podczas akcji ${actionType}`, err);
                alert('Nie udało się wykonać akcji. Spróbuj ponownie.');
                setActionState(prev => ({ ...prev, submitting: false }));
            });
    };


    const cancelAction = () => {
        setActionState({ examId: null, actionType: null, inputValue: '', submitting: false });
    }

    useEffect(()=>{
        axiosInstance.get('/labtech/exams/ordered')
            .then(response=>{
                setExams(response.data);
            })
            .catch(err=>{
                console.error("Błąd podczas pobierania zleconych badań", err);
                setError('Nie udało się załadować badań.');
            })
            .finally(() => {
                setLoading(false);
            });
    },[]);

    if(loading){
        return <p>Ładowanie badań...</p>
    }

    if(error){
        return <div className='error-message'>{error}</div>
    }


    return (
        <div className='lab-tech-panel'>
            <h1>Panel technika laboratorium - Zlecone badania</h1>
            {exams.length===0 ? (
                <p>Brak badan do wykonania.</p>
            ) : (
                <table className="exams-table">
                    <thead>
                        <tr>
                            <th>Kod badania</th>
                            <th>Nazwa badania</th>
                            <th>Uwagi lekarza</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(exam=>(
                            <tr key={exam.code}>
                                <td>{exam.code}</td>
                                <td>{exam.name}</td>
                                <td>{exam.doctorNotes}</td>
                                <td className="actions-cell">
                                    {actionState.examId === exam.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder={actionState.actionType === 'complete' ? 'Wpisz wynik...' : 'Wpisz powód anulowania...'}
                                                value={actionState.inputValue}
                                                onChange={e => setActionState(prev => ({ ...prev, inputValue: e.target.value }))}/>
                                            <button onClick={handleConfirmAction} disabled={actionState.submitting}>
                                            {actionState.submitting ? 'Wysyłanie...' : 'Zatwierdź'}
                                            </button>
                                            <button onClick={cancelAction} disabled={actionState.submitting}>Anuluj</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className="btn-complete" onClick={() => handleActionClick(exam.id, 'complete')}>Zrealizuj</button>
                                            <button className="btn-cancel" onClick={() => handleActionClick(exam.id, 'cancel')}>Anuluj</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>

    )
}

export default LabTechPanel;
