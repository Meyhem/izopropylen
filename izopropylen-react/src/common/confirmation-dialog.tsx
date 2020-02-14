import React, { useCallback } from 'react'

import { Modal, Button } from 'react-bootstrap'

interface ConfirmationDialogProps {
    show: boolean
    title: string
    text: string
    data?: any

    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
    onConfirm: (data?: any) => void
    onCancel: (data?: any) => void

}
export const ConfirmationDialog = ({
    show, title, text, data, onConfirm, onCancel, variant = 'primary'
}: ConfirmationDialogProps) => {
    const onConfirmCb = useCallback(() => onConfirm(data), [data, onConfirm])
    const onCancelCb = useCallback(() => onCancel(data), [data, onCancel])

    return <Modal show={show}>
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
            <Button onClick={onCancelCb} variant='light'>Cancel</Button>
            <Button onClick={onConfirmCb} variant={variant}>Confirm</Button>
        </Modal.Footer>
    </Modal>
}
