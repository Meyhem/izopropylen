import React from 'react'
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap'
import cls from 'classnames'

import { Form as FForm, Field as FField } from 'react-final-form'
import { required } from '../../validators'
import { isInvalid, isValid } from '../../util'

interface CreateProjectModalProps {
    show: boolean
    loading: boolean
    errorMessage?: string
    onSubmit: (name: string) => void
    onClose: () => void
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
    show,
    errorMessage,
    loading,
    onSubmit,
    onClose
}) =>
    <FForm
        onSubmit={values => onSubmit(values.name)}
        render={({ handleSubmit, hasValidationErrors, dirtySinceLastSubmit }) =>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <FField name='name' validate={required}>
                                {({ input, meta }) =>
                                    <>
                                        <Form.Control
                                            className={cls(isInvalid(meta) && 'is-invalid', isValid(meta) && 'is-valid')}
                                            type='text'
                                            placeholder='Project name'
                                            autoFocus={true}
                                            {...input}
                                        />
                                        {isInvalid(meta) && <Form.Text className='invalid-feedback'>{meta.error}</Form.Text>}
                                    </>}
                            </FField>
                        </Form.Group>
                    </Form>
                    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='light'>Close</Button>
                    <Button onClick={handleSubmit} variant='primary' disabled={loading && hasValidationErrors && !dirtySinceLastSubmit}>
                        {loading ? <Spinner animation='border' size='sm' /> : 'Create'}
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    />