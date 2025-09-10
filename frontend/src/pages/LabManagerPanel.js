 import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';
import './LabManagerPanel.css'; 
function LabManagerPanel() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
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
    }, []);
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
                                    <button className="btn-approve">Zatwierdź</button>
                                    <button className="btn-cancel">Anuluj</button>
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
