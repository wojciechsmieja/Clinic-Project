import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../components/axiosInstance';
import { Container, Card, Table, Button, Form, Alert, Modal, Spinner, Tabs, Tab, Row, Col } from 'react-bootstrap';
import './AdminPanel.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pesel: '',
    data_ur: '',
    status: 'pracuje',
    rola: 'lekarz',
    name: '',
    surname: '',
    npwz: ''
  });
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' }); // For general feedback

  // Modal for editing employee
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [editFormFeedback, setEditFormFeedback] = useState({ type: '', message: '' }); // For modal feedback

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/employees');
      console.log(response.data);
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError('Nie udało się załadować listy pracowników');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) {
      return employees;
    }
    return employees.filter(emp => {
      const term = searchTerm.toLowerCase();
      const nameMatch = emp.name && emp.name.toLowerCase().includes(term);
      const surnameMatch = emp.surname && emp.surname.toLowerCase().includes(term);
      const usernameMatch = emp.username && emp.username.toLowerCase().includes(term);
      return nameMatch || surnameMatch || usernameMatch;
    });
  }, [searchTerm, employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    const EmployeePayload = {
      username: formData.username,
      password: formData.password,
      pesel: formData.pesel,
      data_ur: formData.data_ur,
      status: formData.status,
      admin: formData.rola === 'admin',
      rola: formData.rola,
      name: formData.name,
      surname: formData.surname,
      npwz: formData.rola === 'lekarz' ? formData.npwz : null
    };

    try {
      await axiosInstance.post('/employees',EmployeePayload);
      setFeedback({ type: 'success', message: 'Pracownik dodany pomyślnie!' });
      fetchEmployees(); // Refresh list
      setFormData({username:'', password: '', pesel:'', data_ur:'', status:'pracuje', rola:'lekarz', name:'', surname:'', npwz:''});
    } catch (error) {
      console.error('Błąd podczas dodawania pracownika:', error);
      setFeedback({ type: 'danger', message: 'Błąd podczas dodawania pracownika.' });
    }
  };

  // Modal functions
  const handleEditClick = (employee) => {
      setEditingEmployee(employee); 
      setEditFormData(employee); 
      setEditFormFeedback({ type: '', message: '' });
      setShowEditModal(true);
  };

  const handleCloseModal = () => {
      setShowEditModal(false);
      setEditingEmployee(null);
      setEditFormData(null);
      setEditFormFeedback({ type: '', message: '' });
  }; 

  const handleEditFormChange = (e) => {
      const { name, value } = e.target;
      setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateEmployee = async (e) => {
      e.preventDefault();
      if (!editFormData) return;
      setEditFormFeedback({ type: '', message: '' });

      const updatePayload = {
        name: editFormData.name,
        surname:editFormData.surname,
        dateOfBirth:editFormData.dateOfBirth,
        status:editFormData.status
      };

      try {
          const response = await axiosInstance.put(`/employees/${editingEmployee.id}`, updatePayload);
          const updatedEmployee = response.data;
          setEmployees(prev => prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
          setEditFormFeedback({ type: 'success', message: 'Dane pracownika zaktualizowane!' });
          handleCloseModal();
      } catch (err) {
          console.error('Błąd podczas aktualizacji pracownika:', err);
          setEditFormFeedback({ type: 'danger', message: 'Wystąpił błąd podczas aktualizacji.' });
      }
  };

  return (
    <Container fluid className="jump p-4 bg-black text-light min-vh-100">
      <h1 className="mb-4">Panel Administratora</h1>

      {feedback.message && (
        <Alert variant={feedback.type} onClose={() => setFeedback({ message: '' })} dismissible className="mt-3">
          {feedback.message}
        </Alert>
      )}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <Tabs defaultActiveKey="addEmployee" id="admin-panel-tabs" className="dark custom-tabs" justify variant="dark">
        <Tab eventKey="addEmployee" title="Dodaj nowego pracownika">
          <Card className="shadow-sm bg-dark text-light">
            <Card.Body>
              <Card.Title as="h5" className="mb-4 mt-2">Formularz dodawania pracownika</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Imię</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nazwisko</Form.Label>
                      <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required className="bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Login</Form.Label>
                      <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required className="input-fix bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hasło</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required className="input-fix bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>PESEL</Form.Label>
                      <Form.Control type="text" name="pesel" value={formData.pesel} onChange={handleChange} required className="input-fix bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Data urodzenia</Form.Label>
                      <Form.Control type="date" name="data_ur" value={formData.data_ur} onChange={handleChange} required className="bg-dark text-light border-secondary" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleChange} className="bg-dark text-light border-secondary">
                        <option value="pracuje">pracuje</option>
                        <option value="zwolniony">zwolniony</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rola</Form.Label>
                      <Form.Select id="rola" name="rola" value={formData.rola} onChange={handleChange} className="bg-dark text-light border-secondary">
                        <option value="lekarz">Lekarz</option>
                        <option value="rejestrator">Rejestrator</option>
                        <option value="laborant">Laborant</option>
                        <option value="kierownik">Kierownik laboratorium</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {formData.rola === 'lekarz' && (
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>NPWZ</Form.Label>
                        <Form.Control type="number" name="npwz" value={formData.npwz} onChange={handleChange} required className="bg-dark text-light border-secondary" />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Button type="submit" variant="primary" className="mt-3">Dodaj pracownika</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="manageEmployees" title="Zarządzaj pracownikami">
          <Card className="shadow-sm bg-dark text-light">
            <Card.Body>
              <Card.Title as="h5" className="mb-4">Lista pracowników</Card.Title>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Szukaj po imieniu, nazwisku, loginie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              {loading && <p>Ładowanie pracowników...</p>}
              {error && <Alert variant="danger">{error}</Alert>}

              {!loading && !error && (
                <Table striped bordered hover responsive variant="dark">
                  <thead>
                    <tr>
                      <th>Imię</th>
                      <th>Nazwisko</th>
                      <th>Data urodzenia</th>
                      <th>Rola</th>
                      <th>Status</th>
                      <th>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                          <td>{emp.name}</td>
                          <td>{emp.surname}</td>
                          <td>{emp.dateOfBirth}</td>
                          <td>{emp.role}</td>
                          <td>{emp.status}</td>
                          <td>
                            <Button variant="info" size="sm" onClick={() => handleEditClick(emp)}>Edytuj</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">Brak pracowników do wyświetlenia.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-dark text-light border-secondary">
          <Modal.Title>Edytuj dane pracownika</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary text-light">
          {editFormFeedback.message && (
            <Alert variant={editFormFeedback.type} onClose={() => setEditFormFeedback({ message: '' })} dismissible>
              {editFormFeedback.message}
            </Alert>
          )}
          <Form onSubmit={handleUpdateEmployee}>
            <Form.Group className="mb-3">
              <Form.Label>Imię</Form.Label>
              <Form.Control type="text" name="name" value={editFormData?.name || ''} onChange={handleEditFormChange} required className="bg-dark text-light border-secondary" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control type="text" name="surname" value={editFormData?.surname || ''} onChange={handleEditFormChange} required className="bg-dark text-light border-secondary" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data urodzenia</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={editFormData?.dateOfBirth || ''} onChange={handleEditFormChange} required className="bg-dark text-light border-secondary" /> 
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={editFormData?.status || ''} onChange={handleEditFormChange} className="bg-dark text-light border-secondary">
                <option value="pracuje">pracuje</option>
                <option value="zwolniony">zwolniony</option>
              </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button type="submit" variant="primary" disabled={editFormFeedback.type === 'info'}>
                {editFormFeedback.type === 'info' ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Zapisz zmiany'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCloseModal}>Anuluj</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPanel;