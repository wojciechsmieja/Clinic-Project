import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Form, Alert, Modal, Spinner } from 'react-bootstrap';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        pesel: '',
        dateOfBirth: '',
        email: ''
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    useEffect(() => {
        axiosInstance('/patients')
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania listy pacjentów", error);
                setError("Nie udało się pobrać listy pacjentów.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        const today = new Date().toISOString().split('T')[0];
        if (formData.dateOfBirth > today) {
            setFormError("Data urodzenia nie może być z przyszłości!");
            return;
        }
        if (formData.pesel.length !== 11 || !/^\d+$/.test(formData.pesel)) {
            setFormError("PESEL musi mieć dokładnie 11 cyfr!");
            return;
        }

        axiosInstance.post('/patients', formData)
            .then(response => {
                setPatients(prev => [...prev, response.data].sort((a, b) => a.surname.localeCompare(b.surname)));
                setFormSuccess('Pacjent został pomyślnie dodany.');
                setFormData({ name: '', surname: '', pesel: '', dateOfBirth: '', email: '' });
            })
            .catch(error => {
                console.error("Błąd podczas dodawania pacjenta", error);
                setFormError("Wystąpił błąd podczas dodawania pacjenta.");
            });
    };

    const handleDeleteClick = (patient) => {
        setPatientToDelete(patient);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!patientToDelete) return;
        axiosInstance.delete(`/patients/${patientToDelete.id}`)
            .then(response => {
                if (response.status === 204 || response.status === 200) {
                    setPatients(prev => prev.filter(p => p.id !== patientToDelete.id));
                }
            })
            .catch(error => {
                console.error("Błąd przy usuwaniu pacjenta", error);
                setError("Wystąpił błąd podczas usuwania pacjenta.");
            })
            .finally(() => {
                setShowDeleteModal(false);
                setPatientToDelete(null);
            });
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Ładowanie pacjentów...</p>
            </div>
        );
    }

    return (
        <>
            <Container fluid className="my-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                    <Col lg={7}>
                        <Card className="shadow-sm">
                            <Card.Header as="h5">Lista Pacjentów</Card.Header>
                            <Card.Body>
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imię</th>
                                            <th>Nazwisko</th>
                                            <th className="text-center">Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map(patient => (
                                            <tr key={patient.id}>
                                                <td>{patient.name}</td>
                                                <td>{patient.surname}</td>
                                                <td className="text-center">
                                                    <Button variant="primary" size="sm" onClick={() => navigate(`/patients/${patient.id}`)}>Szczegóły</Button>
                                                    <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeleteClick(patient)}>Usuń</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={5}>
                        <Card className="shadow-sm">
                            <Card.Header as="h5">Dodaj nowego pacjenta</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Imię</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required /></Form.Group></Col>
                                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Nazwisko</Form.Label><Form.Control type="text" name="surname" value={formData.surname} onChange={handleInputChange} required /></Form.Group></Col>
                                        <Col md={6}><Form.Group className="mb-3"><Form.Label>PESEL</Form.Label><Form.Control type="text" name="pesel" value={formData.pesel} onChange={handleInputChange} required /></Form.Group></Col>
                                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Data urodzenia</Form.Label><Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required /></Form.Group></Col>
                                        <Col xs={12}><Form.Group className="mb-3"><Form.Label>Email (opcjonalnie)</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} /></Form.Group></Col>
                                    </Row>
                                    {formError && <Alert variant="danger" className="mt-2">{formError}</Alert>}
                                    {formSuccess && <Alert variant="success" className="mt-2">{formSuccess}</Alert>}
                                    <div className="d-grid mt-3">
                                        <Button type="submit" variant="primary">Dodaj pacjenta</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usunięcia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz usunąć pacjenta: <strong>{patientToDelete?.name} {patientToDelete?.surname}</strong>?<br />Tej operacji nie można cofnąć.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Anuluj</Button>
                    <Button variant="danger" onClick={confirmDelete}>Usuń</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PatientList;