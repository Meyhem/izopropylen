import React from 'react'

import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface MainLayoutProps {
    withContainer?: boolean
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    withContainer = true
}) => {
    return <div>
        <Navbar bg='light' variant='light'>
            <Navbar.Brand>I<sub>p</sub></Navbar.Brand>
            <Nav className='mr-auto'>
                <Link className='nav-link' to='/'>Projects</Link>
            </Nav>
        </Navbar>
        {withContainer && <Container>
            {children}
        </Container>}
        {!withContainer && children}
    </div>
}
