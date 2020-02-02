import React from 'react'
import { Form, Button, Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form as FForm, Field as FField } from 'react-final-form'
import cls from 'classnames'

import { CenterLayout } from '../../common/center-layout'
import { useMemoDispatch } from '../../hooks'
import { required } from '../../validators'
import { useSelector } from 'react-redux'
import { selectIsLoading } from './selectors'
import { authenticate } from './actions'


const isInvalid = (meta: { touched?: boolean, error?: any }) => meta.touched && meta.error

const isValid = (meta: { touched?: boolean, error?: any }) => meta.touched && !meta.error

export const Login = () => {

    const dispatch = useMemoDispatch()
    const isLoading = useSelector(selectIsLoading)
    const onSubmit = (username: string, password: string) => dispatch(authenticate.request({ username, password }))

    return <CenterLayout>
        <Card>
            <Card.Header>
                Authentication
            </Card.Header>
            <Card.Body>
                <FForm onSubmit={(values) => onSubmit(values.username, values.password)} render={({ handleSubmit, hasValidationErrors, dirtySinceLastSubmit }) =>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='username'>
                            <FField name='username' validate={required}>
                                {({ input, meta }) =>
                                    <>
                                        <Form.Control
                                            className={cls(isInvalid(meta) && 'is-invalid', isValid(meta) && 'is-valid')}
                                            type='text'
                                            placeholder='Username'
                                            autoFocus
                                            {...input}>
                                        </Form.Control>
                                        {isInvalid(meta) &&
                                            <Form.Text className='invalid-feedback'>{meta.error}</Form.Text>}
                                    </>}
                            </FField>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <FField name='password' validate={required}>
                                {({ input, meta }) =>
                                    <>
                                        <Form.Control
                                            className={cls(isInvalid(meta) && 'is-invalid', isValid(meta) && 'is-valid')}
                                            type='password'
                                            placeholder='Password'
                                            {...input}>
                                        </Form.Control>
                                        {isInvalid(meta) &&
                                            <Form.Text className='invalid-feedback'>{meta.error}</Form.Text>}
                                    </>}
                            </FField>

                        </Form.Group>
                        <div className='d-flex'>
                            <Link to='/register'>Register</Link>
                            <Button
                                className='ml-auto'
                                type='submit'
                                variant='primary'
                                disabled={hasValidationErrors && !dirtySinceLastSubmit}
                            >
                                {isLoading && <Spinner animation='border' size='sm' />}
                                {!isLoading && 'Login'}
                            </Button>
                        </div>
                    </Form>
                }>
                </FForm>
            </Card.Body>
        </Card>
    </CenterLayout >
}
