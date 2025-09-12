import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import PhysicalExamForm from '../components/PhysicalForm';
import LabExamForm from '../components/labExamForm';
import PatientHistory from '../components/PatientHistory';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, ListGroup, Badge, Modal } from 'react-bootstrap';

function VisitDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [visit, setVisit] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    // Modal state
    const [showEndVisitModal, setShowEndVisitModal] = useState(false);

    const fetchVisitDetails = () => {
        axiosInstance.get(`visits/${id}`)
            .then(response => {
                const visitData = response;
                setVisit(visitData.data);
                setDiagnosis(visitData.data.diagnosis || '');
            })
            .catch(error => {
                console.error("Błąd podczas pobierania szczegółów wizyty!", error);
                setError('Błąd podczas ładowania wizyty. Spróbuj odświeżyć stronę.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchVisitDetails();
    }, [id]);

    const handleUpdate = () => {
        setFeedback({ type: 'info', message: 'Zapisywanie diagnozy...' });
        axiosInstance.patch(`visits/${id}`, { diagnosis: diagnosis })
            .then(() => {
                setFeedback({ type: 'success', message: 'Diagnoza została pomyślnie zaktualizowana.' });
            })
            .catch(error => {
                console.error("błąd podczas aktualizacji wizyty", error);
                setFeedback({ type: 'danger', message: 'Błąd aktualizacji wizyty. Spróbuj ponownie.' });
            });
    };

    const handleEndVisit = () => {
        setShowEndVisitModal(false);
        setFeedback({ type: 'info', message: 'Zakańczanie wizyty...' });
        const payload = {
            diagnosis: diagnosis,
            status: 'Zakończona'
        };
        axiosInstance.patch(`/visits/${id}`, payload)
            .then(() => {
                // alert('Wizyta została zakończona'); // Removed this alert
                navigate('/doctor', { replace: true });
            })
            .catch(error => {
                console.error('Błąd podczas kończenia wizyty!', error);
                setFeedback({ type: 'danger', message: 'Błąd przy zakańczaniu wizyty. Spróbuj ponownie.' });
            });
    };
    
    const handleExamAdded = () => {
        // setFeedback({ type: 'success', message: 'Badanie zostało pomyślnie dodane. Odświeżam dane wizyty...' }); // Removed this feedback
        fetchVisitDetails(); // Re-fetch to update the lists and reset forms
    };

    const getLabBadgeVariant = (status) => {
        switch (status) {
            case 'Zatwierdzone': return 'success';
            case 'Anulowane': return 'danger';
            case 'Zlecone': return 'info';
            case 'Wykonane': return 'primary';
            case 'Anulowane przez kierownika': return 'secondary'; // New case
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie danych wizyty...</p>
            </Container>
        );
    }

    if (error) {
        return <Container><Alert variant="danger" className="mt-4">{error}</Alert></Container>;
    }

    return (
        <>
            <Container fluid className="p-4">
                <Row>
                    <Col lg={8}>
                        <h1 className="mb-4">Realizacja wizyty</h1>
                        
                        {feedback.message && <Alert variant={feedback.type} onClose={() => setFeedback({ message: '' })} dismissible>{feedback.message}</Alert>}

                        <Card className="mb-4 shadow-sm">
                            <Card.Header as="h5">Informacje o wizycie</Card.Header>
                            <Card.Body>
                                <p><strong>Pacjent:</strong> {visit.patient?.name} {visit.patient?.surname}</p>
                                <p><strong>Data:</strong> {new Date(visit.data_wiz).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="mb-0"><strong>Opis:</strong> {visit.opis}</p>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 shadow-sm">
                            <Card.Header as="h5">Diagnoza i podsumowanie</Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Diagnoza</Form.Label>
                                    <Form.Control as="textarea" rows={5} value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="Wprowadź diagnozę i zalecenia..."/>
                                </Form.Group>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Button variant="secondary" onClick={() => navigate('/doctor')}>
                                        &larr; Powrót
                                    </Button>
                                    <div>
                                        <Button variant="primary" onClick={handleUpdate} className="ms-2">Aktualizuj diagnozę</Button>
                                        <Button variant="success" onClick={() => setShowEndVisitModal(true)} className="ms-2">Zakończ wizytę</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <Row>
                            <Col md={6} className="mb-4"><PhysicalExamForm visitId={id} onExamAdded={handleExamAdded} /></Col>
                            <Col md={6} className="mb-4"><LabExamForm visitId={id} onExamAdded={handleExamAdded} /></Col>
                        </Row>
                        
                        <Row>
                            <Col md={6} className="mb-4">
                                {visit.physicalExams?.length > 0 && (
                                    <Card className="shadow-sm">
                                        <Card.Header as="h5">Wykonane badania fizykalne</Card.Header>
                                        <ListGroup variant="flush">
                                            {visit.physicalExams.map((exam, index) => (
                                                <ListGroup.Item key={index}><strong>{exam.name}:</strong> {exam.result}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card>
                                )}
                            </Col>
                            <Col md={6} className="mb-4">
                                {visit.labExams?.length > 0 && (
                                    <Card className="shadow-sm">
                                        <Card.Header as="h5">Zlecone badania laboratoryjne</Card.Header>
                                        <ListGroup variant="flush">
                                            {visit.labExams.map((exam, index) => (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                                                    <Row className="flex-grow-1 me-2"> {/* Use Row and Col for 2-column layout */}
                                                        <Col xs={9}>
                                                            <div className="fw-bold">{exam.name}</div>
                                                            {(exam.status === 'Anulowane' || exam.status === 'Anulowane przez kierownika') && exam.cancelReason ? (
                                                                <div className={exam.status === 'Anulowane' ? "text-danger" : ""}><strong>Powód anulowania:</strong> {exam.cancelReason}</div>
                                                            ) : (
                                                                exam.result && <div><strong>Wynik:</strong> {exam.result}</div>
                                                            )}
                                                        </Col>
                                                        <Col xs={3} className="d-flex align-items-center justify-content-end">
                                                            <Badge bg={getLabBadgeVariant(exam.status)} pill className="fs-7 text-wrap">{exam.status}</Badge>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card>
                                )}
                            </Col>
                        </Row>

                    </Col>

                    <Col lg={4}>
                        <div style={{ position: 'sticky', top: '2rem' }}>
                            {visit.patient?.id && (
                                <PatientHistory patientId={visit.patient.id} currentVisitId={visit.id_wiz} />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showEndVisitModal} onHide={() => setShowEndVisitModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie zakończenia wizyty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz zakończyć wizytę?<br />Spowoduje to zapisanie aktualnej diagnozy i zmianę statusu wizyty na "Zakończona".
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEndVisitModal(false)}>Anuluj</Button>
                    <Button variant="success" onClick={handleEndVisit}>Zakończ wizytę</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VisitDetails;