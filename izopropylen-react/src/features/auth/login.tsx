import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form as FForm, Field as FField } from 'react-final-form'

import { CenterLayout } from '../../common/center-layout'

export const Login = () => {

    const submit = (v: any) => console.log(v)

    return <CenterLayout>
        <Card>
            <Card.Header>
                Authentication
            </Card.Header>
            <Card.Body>
                <FForm onSubmit={submit} render={({ handleSubmit }) =>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='username'>
                            <FField name='username'>
                                {({ input, meta }) =>
                                    <Form.Control type='text' placeholder='Username' autoFocus {...input}></Form.Control>}
                            </FField>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <FField name='password'>
                                {({ input, meta }) =>
                                    <Form.Control type='password' placeholder='Password' {...input}></Form.Control>}
                            </FField>

                        </Form.Group>
                        <div className='d-flex'>
                            <Link to='/register'>Register</Link>
                            <Button className='ml-auto' type='submit' variant='primary'>Login</Button>
                        </div>
                    </Form>
                }>

                </FForm>
            </Card.Body>
        </Card>
    </CenterLayout >
}
