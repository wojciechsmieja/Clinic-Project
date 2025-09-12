import { useState } from "react";
import axios from "../components/axiosInstance";
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/auth/login", {
                username,
                password,
            });

            const { token, role, id_prac } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("id", id_prac);
            onLogin(role); // np. 'LEKARZ'

        } catch (err) {
            setError("Błędne dane logowania. Spróbuj ponownie.");
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5} lg={4}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-1" style={{ color: '#008080', fontWeight: '600' }}>Przychodnia</h2>
                                <p className="text-center text-muted mb-4">Zaloguj się, aby kontynuować</p>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formUsername">
                                        <Form.Label>Nazwa użytkownika</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Wprowadź nazwę użytkownika"
                                            required
                                            size="lg"
                                            className="fix"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Label>Hasło</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Wprowadź hasło"
                                            required
                                            size="lg"
                                            className="fix"
                                        />
                                    </Form.Group>

                                    {error && <Alert variant="danger">{error}</Alert>}

                                    <div className="d-grid mt-4">
                                        <Button variant="primary" type="submit" size="lg">
                                            Zaloguj
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
