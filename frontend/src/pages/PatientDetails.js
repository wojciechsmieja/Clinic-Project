import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import { Container, Card, Table, Button, Modal, Spinner, Alert, Row, Col } from 'react-bootstrap';

function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [scheduledVisits, setScheduledVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    // Modal state
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [visitToCancel, setVisitToCancel] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientResponse = axiosInstance.get(`/patients/${id}`);
                const visitsResponse = axiosInstance.get(`/visits/by-patient/${id}/scheduled`);
                const [patientResult, visitResult] = await Promise.all([patientResponse, visitsResponse]);
                console.log(visitResult.data);
                setPatient(patientResult.data);
                setScheduledVisits(visitResult.data);
            }
            catch (err) {
                setError('Nie udało się załadować danych pacjenta.');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPatientData();
    }, [id]);

    const handleCancelClick = (visitId) => {
        setVisitToCancel(visitId);
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        if (!visitToCancel) return;
        axiosInstance.patch(`/visits/${visitToCancel}`, { status: 'Anulowana' })
            .then(() => {
                setFeedback({ type: 'success', message: 'Wizyta została pomyślnie anulowana.' });
                setScheduledVisits(prevVisits => prevVisits.filter(visit => visit.id_wiz !== visitToCancel));
            })
            .catch(err => {
                setFeedback({ type: 'danger', message: 'Wystąpił błąd podczas anulowania wizyty.' });
                console.error('Błąd anulowania', err);
            })
            .finally(() => {
                setShowCancelModal(false);
                setVisitToCancel(null);
            });
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie danych pacjenta...</p>
            </Container>
        );
    }
    if (error) {
        return <Container><Alert variant="danger" className="mt-4">{error}</Alert></Container>;
    }

    if (!patient) {
        return <Container><Alert variant="info" className="mt-4">Nie znaleziono pacjenta.</Alert></Container>;
    }

    return (
        <>
            <Container className="my-4">
                {/* Removed Button from here */}
                <h1 className="mb-4">Szczegóły pacjenta</h1>
                {feedback.message && <Alert variant={feedback.type} onClose={() => setFeedback({ message: '' })} dismissible>{feedback.message}</Alert>}

                <Card className="shadow-sm mb-4">
                    <Card.Header as="h5">Dane osobowe</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={12} className="mb-2"><strong>Imię:</strong> {patient.name}</Col>
                            <Col md={12} className="mb-2"><strong>Nazwisko:</strong> {patient.surname}</Col>
                            <Col md={12} className="mb-2"><strong>PESEL:</strong> {patient.pesel}</Col>
                            <Col md={12} className="mb-2"><strong>Data urodzenia:</strong> {patient.dateOfBirth}</Col>
                            <Col md={12} className="mb-2"><strong>E-mail:</strong> {patient.email || 'Brak'}</Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card className="shadow-sm mb-4">
                    <Card.Header as="h5">Umówione wizyty</Card.Header>
                    <Card.Body>
                        {scheduledVisits.length > 0 ? (
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Opis</th>
                                        <th>Lekarz</th>
                                        <th className="text-center">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduledVisits.map(visit => (
                                        <tr key={visit.id_wiz}>
                                            <td>{new Date(visit.data_wiz).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{visit.opis}</td>
                                            <td>{visit.doctor ? `${visit.doctor.name} ${visit.doctor.surname}` : 'Brak danych'}</td>
                                            <td className="text-center">
                                                <Button variant="danger" size="sm" onClick={() => handleCancelClick(visit.id_wiz)}>Anuluj wizytę</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p className="text-muted">Pacjent nie ma umówionych wizyt.</p>
                        )}
                    </Card.Body>
                </Card>

                {/* Add button at the bottom */}
                <div className="text-center mt-4">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        &larr; Powrót
                    </Button>
                </div>
            </Container>

            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie anulowania wizyty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz anulować tę wizytę? Tej operacji nie można cofnąć.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>Zamknij</Button>
                    <Button variant="danger" onClick={confirmCancel}>Anuluj wizytę</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PatientDetails;