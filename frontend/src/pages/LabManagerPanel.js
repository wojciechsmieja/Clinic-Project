 import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';
import './LabManagerPanel.css'; 
function LabManagerPanel() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [actionState, setActionState] = useState({
        examId: null, 
        actionType: null, 
        inputValue: '',
        submitting: false,
    });

    const fetchCompletedExams = () => {
        setLoading(true);
        axiosInstance.get('/labmanager/exams/completed')
            .then(response => {
                setExams(response.data);
            })
            .catch(err => {
                console.error("Błąd podczas pobierania wykonanych badań", err);
                setError('Nie udało się załadować badań. Spróbuj ponownie później.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(()=>{
        fetchCompletedExams();
    },[]);

    const handleActionClick = (examId, type) => {
        setActionState({examId:examId, actionType: type, inputValue: '', submitting: false});
    }

    const handleApproveAction = () => {
        const {examId, actionType, inputValue} = actionState;
        if(actionType==='cancel'&&!inputValue){
            alert('Powód nie może być pusty!');
            return;
        }
        setActionState(prev=>({...prev, submitting: true}));

        const payload = actionType ==='cancel' ? {reason: inputValue} : {};

        axiosInstance.patch(`labmanager/exams/${examId}/${actionType}`, payload)
            .then(()=>{
                const actionText = actionType === 'approve' ? 'zatwierdzone' : 'anulowane';
                alert(`Badanie zostało ${actionText}`);
                cancelAction();
                fetchCompletedExams();
            })
            .catch(err=>{
                console.error(`Błąd podczas akcji ${actionType}`, err);
                alert('Nie udało się wykonać akcji.');
                setActionState(prev=>({...prev, submitting:false}));
            });
    };

    const cancelAction = () => {
        setActionState({ examId: null, actionType: null, inputValue: '', submitting: false });
    }

    if (loading) {
        return <div>Ładowanie badań...</div>;
    }
    if (error) {
        return <div className="error-message">{error}</div>;
    }
    return (
        <div className="lab-manager-panel">
            <h1>Panel Kierownika Laboratorium - Badania do Zatwierdzenia</h1>
            {exams.length === 0 ? (
                <p>Brak badań do zatwierdzenia.</p>
            ) : (
                <table className="exams-table">
                    <thead>
                        <tr>
                            <th>Nazwa Badania</th>
                            <th>Wynik</th>
                            <th>Uwagi Lekarza</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(exam => (
                            <tr key={exam.id}>
                                <td>{exam.name} ({exam.code})</td>
                                <td>{exam.result}</td>
                                <td>{exam.doctorNotes}</td>
                                <td className="actions-cell">
                                    {actionState.examId === exam.id ? (                                    
                                        <div>
                                            {actionState.actionType === 'cancel' && (
                                                <input
                                                    type="text"
                                                    placeholder="Wpisz powód anulowania..."
                                                    value={actionState.inputValue}
                                                    onChange={e => setActionState(prev => ({ ...prev, inputValue: e.target.value }))}
                                                />
                                            )}
                                            {actionState.actionType === 'approve' && (
                                                <span>Czy na pewno zatwierdzić?</span>
                                            )}
                                            <button onClick={handleApproveAction} disabled={actionState.submitting}>
                                                {actionState.submitting ? 'Wysyłanie...' : 'Zatwierdź'}
                                            </button>
                                            <button onClick={cancelAction} disabled={actionState.submitting}>Anuluj</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className="btn-approve" onClick={() => handleActionClick(exam.id, 'approve')}>Zatwierdź</button>
                                            <button className="btn-cancel" onClick={() => handleActionClick(exam.id, 'cancel')}>Anuluj</button>
                                        </div>
                                      )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default LabManagerPanel;
