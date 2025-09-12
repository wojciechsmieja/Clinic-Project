import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { Accordion, Card, ListGroup, Spinner, Alert, Badge } from 'react-bootstrap';

function PatientHistory({ patientId, currentVisitId }) {
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
                // Filter out the current visit from the history
                const filteredHistory = response.data.filter(visit => visit.id_wiz !== currentVisitId);
                // Sort history from newest to oldest
                const sortedHistory = filteredHistory.sort((a, b) => new Date(b.data_wiz) - new Date(a.data_wiz));
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

    const getBadgeVariant = (status) => {
        switch (status) {
            case 'Zatwierdzone': return 'success';
            case 'Anulowane': return 'danger';
            case 'Zlecone': return 'info';
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie historii pacjenta...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Card className="mt-4 shadow-sm">
            <Card.Header as="h5" style={{ backgroundColor: '#f8f9fa' }}>Wcześniejsze wizyty pacjenta</Card.Header>
            <Card.Body>
                {history.length > 0 ? (
                    <Accordion>
                        {history.map((visit, index) => (
                            <Accordion.Item key={visit.id_wiz} eventKey={String(index)}>
                                <Accordion.Header>
                                    <span className="fw-bold">Wizyta z dnia: {new Date(visit.data_wiz).toLocaleDateString()}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p><strong>Opis:</strong> {visit.opis || 'Brak'}</p>
                                    <p><strong>Diagnoza:</strong> {visit.diagnoza || 'Brak'}</p>

                                    {visit.physicalExams && visit.physicalExams.length > 0 && (
                                        <div className="mt-3">
                                            <h6>Badania fizykalne</h6>
                                            <ListGroup variant="flush">
                                                {visit.physicalExams.map((exam, idx) => (
                                                    <ListGroup.Item key={`phy-${idx}`} className="px-0">
                                                        <strong>{exam.name}:</strong> {exam.result}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    )}

                                    {visit.labExams && visit.labExams.length > 0 && (
                                        <div className="mt-3">
                                            <h6>Badania laboratoryjne</h6>
                                            <ListGroup variant="flush">
                                                {visit.labExams.map((exam, idx) => (
                                                    <ListGroup.Item key={`lab-${idx}`} className="d-flex justify-content-between align-items-start px-0">
                                                        <div>
                                                            <div className="fw-bold">{exam.name}</div>
                                                            {exam.result && <div><strong>Wynik:</strong> {exam.result}</div>}
                                                            {exam.cancelReason && <div className="text-danger"><strong>Powód anulowania:</strong> {exam.cancelReason}</div>}
                                                        </div>
                                                        <Badge bg={getBadgeVariant(exam.status)} pill>
                                                            {exam.status}
                                                        </Badge>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-muted">Brak zakończonych wizyt w historii pacjenta.</p>
                )}
            </Card.Body>
        </Card>
    );
}
export default PatientHistory;