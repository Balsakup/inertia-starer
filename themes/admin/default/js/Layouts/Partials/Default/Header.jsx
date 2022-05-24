import React from 'react';
import {Container, Navbar} from 'react-bootstrap';

function Header() {
    return (
        <Navbar variant="light" expand="md" className="d-none d-lg-flex d-print-none">
            <Container fluid="xl">
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Navbar.Collapse id="navbar-menu">

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
