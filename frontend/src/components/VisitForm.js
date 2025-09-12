import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { Form, Button, Container, Row, Col, Card, ListGroup, ButtonGroup, Alert } from 'react-bootstrap';

function VisitForm() {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    // new state for availability logic
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const [form, setForm] = useState({
        opis: '',
        id_lek: '',
        id_pac: '',
        id_rej: 2, // Hardcoded for now
        status: 'Umówiona',
        duration: '15', // Default duration in minutes
        visitDateTime: '', // This will be the final selected slot
    });

    // Fetch doctors and patients
    useEffect(() => {
        axiosInstance('/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Błąd pobierania lekarzy:', error));

        axiosInstance('/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error("Błąd podczas pobierania listy pacjentów", error));
    }, []);

    // Patient search logic
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPatients([]);
        } else {
            const q = searchQuery.toLowerCase();
            setFilteredPatients(
                patients.filter(p => p.name.toLowerCase().includes(q) || p.surname.toLowerCase().includes(q))
            );
        }
    }, [searchQuery, patients]);

    useEffect(() => {
        if (form.id_lek && form.duration) {
            // Fetching available slots is now triggered by selecting a day
        }
        // Reset selections when doctor or duration changes
        setAvailableSlots([]);
        setSelectedDay(null);
        setSelectedSlot(null);
        setForm(prev => ({ ...prev, visitDateTime: '' }));
    }, [form.id_lek, form.duration]);

    const handleDaySelect = (e) => {
        const day = e.target.value;
        setSelectedDay(day);
        setSelectedSlot(null); // Reset slot selection
        setForm(prev => ({ ...prev, visitDateTime: '' }));
        axiosInstance.get(`/doctors/${form.id_lek}/available-slots`, {
            params: { date: day, duration: form.duration }
        })
            .then(response => {
                setAvailableSlots(response.data);
            })
            .catch(error => {
                console.error('Błąd pobierania dostępnych godzin:', error);
                setAvailableSlots([]);
            });
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        const dateTime = `${selectedDay}T${slot}`;
        setForm(prev => ({ ...prev, visitDateTime: dateTime }));
        setSuccess(`Wybrano termin: ${selectedDay} o godzinie ${slot.substring(0, 5)}`);
        setError('');
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectPatient = (pac) => {
        setForm(prev => ({ ...prev, id_pac: pac.id }));
        setSearchQuery(`${pac.name} ${pac.surname}`);
        setFilteredPatients([]);
    };

    const formatDuration = (minutes) => {
        const h = Math.floor(minutes / 60).toString().padStart(2, '0');
        const m = (minutes % 60).toString().padStart(2, '0');
        return `${h}:${m}:00`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.id_pac) {
            setError("Musisz wybrać pacjenta!");
            return;
        }
        if (!form.visitDateTime) {
            setError("Musisz wybrać termin wizyty!");
            return;
        }

        const postData = {
            opis: form.opis,
            data_wiz: form.visitDateTime,
            czas_trwania: formatDuration(form.duration),
            id_lek: form.id_lek,
            id_pac: form.id_pac,
            id_rej: form.id_rej,
            status: form.status,
        };

        axiosInstance.post('/visits', postData)
            .then(response => {
                setSuccess("Wizyta została pomyślnie zapisana!");
                // Reset form
                setForm({
                    opis: '', id_lek: '', id_pac: '', id_rej: 2,
                    status: 'Umówiona', duration: '15', visitDateTime: '',
                });
                setSearchQuery('');
                setAvailableSlots([]);
                setSelectedDay(null);
                setSelectedSlot(null);
            })
            .catch(err => {
                console.error(err);
                setError('Wystąpił błąd podczas zapisu wizyty. Sprawdź konsolę deweloperską.');
            });
    };

    return (
        <Container className="my-4">
            <Card className="shadow-sm">
                <Card.Header as="h4" className="text-center mb-4">Ustal nową wizytę</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                            <Col xs={12}>
                                <Form.Group controlId="formOpis">
                                    <Form.Label>Opis wizyty</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="opis" value={form.opis} onChange={handleChange} required placeholder="Wprowadź krótki opis wizyty..." />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formLekarz">
                                    <Form.Label>Lekarz</Form.Label>
                                    <Form.Select name="id_lek" value={form.id_lek} onChange={handleChange} required>
                                        <option value="">-- Wybierz lekarza --</option>
                                        {doctors.map(doc => (
                                            <option key={doc.id} value={doc.id}>{doc.name} {doc.surname}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formDuration">
                                    <Form.Label>Czas trwania wizyty</Form.Label>
                                    <Form.Select name="duration" value={form.duration} onChange={handleChange} required>
                                        <option value="15">15 minut</option>
                                        <option value="20">20 minut</option>
                                        <option value="30">30 minut</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {form.id_lek && form.duration && (
                                <Col xs={12}>
                                    <hr />
                                    <h4 className="mb-3">Wybierz dzień</h4>
                                    <Form.Control type="date" onChange={handleDaySelect} className='rp-calebdar'/>
                                </Col>
                            )}

                            {selectedDay && (
                                <Col xs={12}>
                                    <h4 className="mb-3">Wybierz godzinę (dla {selectedDay})</h4>
                                    {availableSlots.length > 0 ? (
                                        <div className="time-slot-container">
                                            {availableSlots.map(slot => (
                                                <div
                                                    key={slot}
                                                    className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                                                    onClick={() => handleSlotSelect(slot)}
                                                >
                                                    {slot.substring(0, 5)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Brak dostępnych godzin w tym dniu.</p>
                                    )}
                                </Col>
                            )}
                            
                            <Col xs={12}>
                                <hr />
                                <Form.Group controlId="formPatientSearch">
                                    <Form.Label>Pacjent</Form.Label>
                                    <Form.Control type="text" placeholder="Wyszukaj pacjenta po imieniu lub nazwisku..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                </Form.Group>
                                {filteredPatients.length > 0 && (
                                    <ListGroup className="mt-2">
                                        {filteredPatients.map(pac => (
                                            <ListGroup.Item action key={pac.id} onClick={() => handleSelectPatient(pac)}>
                                                <strong>{pac.name} {pac.surname}</strong> (PESEL: {pac.pesel})
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </Col>

                            <Col xs={12} className="mt-4">
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="info">{success}</Alert>}
                            </Col>

                            <Col xs={12} className="text-center mt-4">
                                <Button variant="primary" type="submit" size="lg">Zapisz wizytę</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default VisitForm;