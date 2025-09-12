import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <BootstrapNavbar style={{ backgroundColor: '#008080' }} variant="dark" className="mb-3">
            <Container fluid>
                <BootstrapNavbar.Brand href="#">
                    <span role="img" aria-label="stethoscope" style={{ marginRight: '10px' }}>🩺</span>
                    Przychodnia
                </BootstrapNavbar.Brand>
                <Nav className="ms-auto">
                    <Button variant="outline-light" onClick={handleLogout}>Wyloguj</Button>
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;