import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

function PhysicalExamForm({ visitId, onExamAdded }) {
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState({ error: null, success: null });


    useEffect(() => {
        axiosInstance.get('codes/physical')
            .then(response => {
                setCodes(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas poboru kodów fizykalnych", error);
                setError('Nie udało się załadować słownika badań fizykalnych');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitStatus({ error: null, success: null });

        if (!selectedCode || !result) {
            setSubmitStatus({ error: 'Proszę wybrać badanie i wpisać wynik', success: null });
            return;
        }

        const payload = {
            code: selectedCode,
            result: result
        };

        axiosInstance.post(`visits/${visitId}/physical-exams`, payload)
            .then(response => {
                setSubmitStatus({ error: null, success: 'Badanie fizykalne zostało pomyślnie dodane.' });
                setSelectedCode('');
                setResult('');
                if (onExamAdded) { // Call the callback if it exists
                    onExamAdded();
                }
            })
            .catch(err => {
                setSubmitStatus({ error: 'Błąd podczas dodawania badania. Spróbuj ponownie.', success: null });
                console.error("Błąd podczas dodawania badania", err);
            });
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie formularza badań...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Card className="mt-4 shadow-sm">
            <Card.Header as="h5" style={{ backgroundColor: '#f8f9fa' }}>Dodaj badanie fizykalne</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col xs={12}>
                            <Form.Group controlId="physicalExamCode">
                                <Form.Label>Badanie</Form.Label>
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
                            <Form.Group controlId="physicalExamResult">
                                <Form.Label>Wynik</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={result}
                                    onChange={e => setResult(e.target.value)}
                                    required
                                    placeholder="Wprowadź wynik badania..."
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            {submitStatus.error && <Alert variant="danger" className="mt-2">{submitStatus.error}</Alert>}
                            {submitStatus.success && <Alert variant="success" className="mt-2">{submitStatus.success}</Alert>}
                        </Col>

                        <Col xs={12} className="text-end">
                            <Button variant="primary" type="submit">
                                Dodaj badanie
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default PhysicalExamForm;