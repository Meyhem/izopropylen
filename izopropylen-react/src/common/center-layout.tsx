import React from 'react'

import { Row, Col, Container } from 'react-bootstrap'

export const CenterLayout: React.FC = ({children}) => {
    return <Container>
        <Row className='justify-content-center'>
            <Col xs={4}>
                {children}
            </Col>
        </Row>
    </Container>
}
