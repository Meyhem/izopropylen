import React from 'react'

import { Navbar, Nav, Container } from 'react-bootstrap'

export const MainLayout: React.FC = ({children}) => {
    return <div>
        <Navbar bg="light" variant="light">
            <Navbar.Brand>I<sub>p</sub></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
        </Navbar>
        <Container>
            {children}
        </Container>
    </div>
}
