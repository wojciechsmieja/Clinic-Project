import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

function LabExamForm({ visitId, onExamAdded }) {
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
    const [doctorNotes, setDoctorNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState({ error: null, success: null });

    useEffect(() => {
        axiosInstance.get("codes/laboratory")
            .then(response => {
                setCodes(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas poboru kodów laboratoryjnych", error);
                setError('Nie udało się załadować słownika badań laboratoryjnych');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitStatus({ error: null, success: null });

        if (!selectedCode) {
            setSubmitStatus({ error: 'Proszę wybrać badanie z listy.', success: null });
            return;
        }

        const payload = {
            code: selectedCode,
            doctorNotes: doctorNotes
        };

        axiosInstance.post(`visits/${visitId}/lab-exams`, payload)
            .then(response => {
                setSubmitStatus({ error: null, success: 'Zlecenie na badanie laboratoryjne zostało pomyślnie dodane.' });
                setSelectedCode('');
                setDoctorNotes('');
                if (onExamAdded) { // Call the callback if it exists
                    onExamAdded();
                }
            })
            .catch(err => {
                setSubmitStatus({ error: 'Błąd podczas zlecania badania. Spróbuj ponownie.', success: null });
                console.error("Błąd podczas dodawania badania lab", err);
            });
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie formularza...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Card className="mt-4 shadow-sm">
            <Card.Header as="h5" style={{ backgroundColor: '#f8f9fa' }}>Zleć badanie laboratoryjne</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col xs={12}>
                            <Form.Group controlId="labExamCode">
                                <Form.Label>Badanie laboratoryjne</Form.Label>
                                <Form.Select value={selectedCode} onChange={e => setSelectedCode(e.target.value)} required>
                                    <option value="" disabled>Wybierz badanie z listy...</option>
                                    {codes.map(code => (
                                        <option key={code.code} value={code.code}>
                                            {code.code} ({code.name})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="labExamNotes">
                                <Form.Label>Dodatkowe informacje (opcjonalne)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={doctorNotes}
                                    onChange={e => setDoctorNotes(e.target.value)}
                                    placeholder="Wprowadź dodatkowe uwagi dla laboratorium..."
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            {submitStatus.error && <Alert variant="danger" className="mt-2">{submitStatus.error}</Alert>}
                            {submitStatus.success && <Alert variant="success" className="mt-2">{submitStatus.success}</Alert>}
                        </Col>

                        <Col xs={12} className="text-end">
                            <Button variant="primary" type="submit">
                                Zleć badanie
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LabExamForm;