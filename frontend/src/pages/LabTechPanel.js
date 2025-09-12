import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';
import { Container, Card, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';

const LabTechPanel = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    // Modal and action state
    const [showModal, setShowModal] = useState(false);
    const [actionInfo, setActionInfo] = useState({ exam: null, type: null, value: '', isSubmitting: false });

    const fetchOrderedExams = () => {
        setLoading(true);
        axiosInstance.get("/labtech/exams/ordered")
            .then(response => {
                setExams(response.data);
            })
            .catch(err => {
                console.error("Błąd podczas pobierania zleconych badań", err);
                setError('Nie udało się załadować badań. Spróbuj ponownie później.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrderedExams();
    }, []);

    const handleActionClick = (exam, type) => {
        setActionInfo({ exam, type, value: '', isSubmitting: false });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActionInfo({ exam: null, type: null, value: '', isSubmitting: false });
    };

    const handleConfirmAction = () => {
        const { exam, type, value } = actionInfo;
        if (!exam || !value) {
            alert('Pole nie może być puste!');
            return;
        }

        setActionInfo(prev => ({ ...prev, isSubmitting: true }));

        const url = `/labtech/exams/${exam.id}/${type}`;
        const payload = type === 'complete' ? { result: value } : { reason: value };

        axiosInstance.patch(url, payload)
            .then(() => {
                const actionText = type === 'complete' ? 'zrealizowane' : 'anulowane';
                setFeedback({ type: 'success', message: `Badanie zostało ${actionText}.` });
                fetchOrderedExams(); // Refresh the list
            })
            .catch(err => {
                console.error(`Błąd podczas akcji ${type}`, err);
                setFeedback({ type: 'danger', message: 'Nie udało się wykonać akcji. Spróbuj ponownie.' });
            })
            .finally(() => {
                handleCloseModal();
            });
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie badań...</p>
            </Container>
        );
    }

    return (
        <>
            <Container className="my-4">
                <h1>Panel Technika Laboratorium</h1>
                {feedback.message && (
                    <Alert variant={feedback.type} onClose={() => setFeedback({ message: '' })} dismissible className="mt-3">
                        {feedback.message}
                    </Alert>
                )}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Card className="mt-4 shadow-sm">
                    <Card.Header as="h5">Zlecone Badania</Card.Header>
                    <Card.Body>
                        {exams.length === 0 ? (
                            <p className="text-muted">Brak badań do wykonania.</p>
                        ) : (
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Kod Badania</th>
                                        <th>Nazwa Badania</th>
                                        <th>Uwagi Lekarza</th>
                                        <th className="text-center">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map(exam => (
                                        <tr key={exam.id}>
                                            <td>{exam.code}</td>
                                            <td>{exam.name}</td>
                                            <td>{exam.doctorNotes || 'Brak'}</td>
                                            <td className="text-center">
                                                <Button variant="primary" size="sm" onClick={() => handleActionClick(exam, 'complete')}>Zrealizuj</Button>
                                                <Button variant="danger" size="sm" onClick={() => handleActionClick(exam, 'cancel')} className="ms-2">Anuluj</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {actionInfo.type === 'complete' ? 'Zrealizuj badanie' : 'Anuluj badanie'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Badanie: <strong>{actionInfo.exam?.name}</strong> ({actionInfo.exam?.code})</p>
                    <Form.Group>
                        <Form.Label>
                            <strong>{actionInfo.type === 'complete' ? 'Wynik badania (wymagany)' : 'Powód anulowania (wymagany)'}</strong>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={actionInfo.value}
                            onChange={e => setActionInfo(prev => ({ ...prev, value: e.target.value }))}
                            placeholder={actionInfo.type === 'complete' ? 'Wpisz wynik...' : 'Wpisz powód...'}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={actionInfo.isSubmitting}>
                        Zamknij
                    </Button>
                    <Button
                        variant={actionInfo.type === 'complete' ? 'primary' : 'danger'}
                        onClick={handleConfirmAction}
                        disabled={actionInfo.isSubmitting}
                    >
                        {actionInfo.isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Potwierdź'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LabTechPanel;