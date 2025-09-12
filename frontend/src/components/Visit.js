import React, { useEffect, useState, useMemo } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Badge, Modal, Spinner, Alert } from 'react-bootstrap';

function formatDuration(durationString) {
    if (!durationString) {
        return 'Brak danych';
    }
    // Extracts the first sequence of digits from a string like "PT15M"
    const minutesMatch = durationString.match(/(\d+)M/);
    if (minutesMatch && minutesMatch[1]) {
        return `${minutesMatch[1]} minut`;
    }
    return 'błędny format';
}

function Visit() {
    const navigate = useNavigate();
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [visitToCancel, setVisitToCancel] = useState(null);

    useEffect(() => {
        axiosInstance('visits')
            .then(response => {
                const sortedVisits = response.data.sort((a, b) => new Date(a.data_wiz) - new Date(b.data_wiz));
                setVisits(sortedVisits);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania wizyt", error);
                setError("Błąd podczas pobierania wizyt");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const groupedVisits = useMemo(() => {
        const scheduled = visits.filter(v => v.status.toLowerCase() === "umówiona");
        const others = visits.filter(v => v.status.toLowerCase() !== "umówiona");
        console.log(others);
        return { scheduled, others };
    }, [visits]);

    const handleCancelClick = (visit) => {
        setVisitToCancel(visit);
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        if (!visitToCancel) return;
        axiosInstance.patch(`/visits/${visitToCancel.id_wiz}`, { "status": "Anulowana" })
            .then(response => {
                if (response.status === 204 || response.status === 200) {
                    setVisits(prevVisits => prevVisits.map(v =>
                        v.id_wiz === visitToCancel.id_wiz ? { ...v, status: 'Anulowana' } : v
                    ));
                    setFeedback({ type: 'success', message: 'Wizyta została pomyślnie anulowana.' });
                } else {
                    setFeedback({ type: 'danger', message: 'Błąd podczas anulowania wizyty.' });
                }
            })
            .catch(err => {
                console.error("Błąd przy anulowaniu wizyty", err);
                setFeedback({ type: 'danger', message: 'Wystąpił błąd serwera podczas anulowania wizyty.' });
            })
            .finally(() => {
                setShowCancelModal(false);
                setVisitToCancel(null);
            });
    };

    const getBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'zakończona': return 'success';
            case 'anulowana': return 'danger';
            case 'umówiona': return 'info';
            default: return 'secondary';
        }
    };

    const renderHistoryVisitItem = (visit) => (
        <ListGroup.Item key={visit.id_wiz} className="p-3">
            <Row className="align-items-center">
                <Col md={3}>
                    <div className="fw-bold">{visit.patient ? `${visit.patient.name} ${visit.patient.surname}` : 'Brak danych pacjenta'}</div>
                    <p className="mb-0 mt-1">{visit.opis}</p>
                </Col>
                <Col md={3}>
                    <div>Data wizyty</div>
                    <div className="fw-light">{new Date(visit.data_wiz).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
                </Col>
                <Col md={3}>
                    { visit.cancelDate &&
                        <>
                            <div>Data anulowania/zakończenia</div>
                            <div className="fw-light">{new Date(visit.cancelDate).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
                        </>
                    }
                </Col>
                <Col md={3} className="text-md-end">
                    <Badge bg={getBadgeVariant(visit.status)} pill className="fs-6">{visit.status}</Badge>
                </Col>
            </Row>
        </ListGroup.Item>
    );

    const renderVisitItem = (visit, isScheduled) => (
        <ListGroup.Item key={visit.id_wiz} className="p-3">
            <Row className="align-items-center">
                <Col md={8}>
                    <div className="fw-bold">{visit.patient ? `${visit.patient.name} ${visit.patient.surname}` : 'Brak danych pacjenta'}</div>
                    <div className="text-muted">
                        {new Date(visit.data_wiz).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} • {formatDuration(visit.czas_trwania)}
                        {visit.status.toLowerCase() === 'anulowana' && visit.cancelDate &&
                            ` • Anulowano: ${new Date(visit.cancelDate).toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}`
                        }
                    </div>
                    <p className="mb-0 mt-1">{visit.opis}</p>
                </Col>
                <Col md={4} className="text-md-end mt-2 mt-md-0">
                    {isScheduled ? (
                        <>
                            <Button variant="primary" onClick={() => navigate(`/visit/${visit.id_wiz}`)}>
                                Rozpocznij
                            </Button>
                            <Button variant="outline-danger" className="ms-2" onClick={() => handleCancelClick(visit)}>
                                Anuluj
                            </Button>
                        </>
                    ) : (
                        <Badge bg={getBadgeVariant(visit.status)} pill className="fs-6">{visit.status}</Badge>
                    )}
                </Col>
            </Row>
        </ListGroup.Item>
    );

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie wizyt...</p>
            </div>
        );
    }

    return (
        <>
            <Container className="my-4">
                {feedback.message && (
                    <Alert variant={feedback.type} onClose={() => setFeedback({ message: '' })} dismissible>
                        {feedback.message}
                    </Alert>
                )}
                {error && <Alert variant="danger">{error}</Alert>}

                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5">Twoje umówione wizyty</Card.Header>
                    <ListGroup variant="flush">
                        {groupedVisits.scheduled.length > 0 ?
                            groupedVisits.scheduled.map(v => renderVisitItem(v, true)) :
                            <ListGroup.Item>Brak umówionych wizyt.</ListGroup.Item>
                        }
                    </ListGroup>
                </Card>

                <Card className="shadow-sm">
                    <Card.Header as="h5">Historia wizyt</Card.Header>
                    <ListGroup variant="flush">
                        {groupedVisits.others.length > 0 ?
                            groupedVisits.others.map(v => renderHistoryVisitItem(v)) :
                            <ListGroup.Item>Brak historii wizyt.</ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </Container>

            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie anulowania</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz anulować wizytę dla pacjenta: 
                    <strong>{visitToCancel?.patient?.name} {visitToCancel?.patient?.surname}</strong>
                     w dniu {new Date(visitToCancel?.data_wiz || '').toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })};
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>Zamknij</Button>
                    <Button variant="danger" onClick={confirmCancel}>Anuluj wizytę</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Visit;