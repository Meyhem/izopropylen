import React, { useState, useCallback, useMemo } from 'react'
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap'

import { getCultureCodes } from '../../cultures'
import { fun } from '../../util'

interface ImportDialogProps {
    show: boolean

    onConfirm: () => void
    onCancel: () => void
}

function loadFile(evt: React.FormEvent<HTMLInputElement>, onStart: Func<void>, onProgress: Func<number>, onDone: Func<string>) {
    const t = evt.target as HTMLInputElement
    onStart()
    // tslint:disable-next-line: no-unnecessary-initializer
    let f: File | undefined = undefined

    if (!t.files || !t.files.length) {
        alert('No file specified')
    }

    if (t.files!.length > 1) {
        alert('Specify one file at the time')
    }

    if (t.files?.length === 1) {
        f = t.files[0]
    }

    if (!f) return

    const reader = new FileReader()
    reader.onprogress = e => onProgress(e.loaded / e.total)
    reader.onload = () => onDone(reader.result as string)

    reader.readAsText(f)
}

export const ImportDialog = ({
    show
}: ImportDialogProps) => {
    const [progress, setProgress] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>()
    const [json, setJson] = useState<string>()
    const [importTargetCode, setImportTargetCode] = useState<string>('')
    const cultureList = useMemo(getCultureCodes, [])
    const readyForImport = !loading && importTargetCode && json

    const begin = useCallback(() => {
        setLoading(true)
        setProgress(0)
        setJson(undefined)
    }, [])

    const finalize = useCallback((jsonStr: string) => {
        setLoading(false)
        setProgress(1)
        setJson(jsonStr)
    }, [])

    return <Modal show={show} onHide={fun.noop}>
        <Modal.Header>
            <Modal.Title>Import file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Upload <b>.json</b> file</Form.Label>
                <Form.Control
                    disabled={loading}
                    type='file'
                    multiple={false}
                    accept='.json'
                    onChange={(e: React.FormEvent<HTMLInputElement>) => loadFile(e, begin, setProgress, finalize)}
                />
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Label>Select culture to import to</Form.Label>
                <Form.Control as='select' value={importTargetCode} onChange={(e: any) => setImportTargetCode(e.target.value)}>
                    <option value=''>Select culture</option>
                    {cultureList.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                </Form.Control>
            </Form.Group>
            {loading && <ProgressBar now={progress * 100} label={`${Math.ceil(progress * 100)}%`} />}
        </Modal.Body>
        <Modal.Footer>
            <Button variant='light'>Cancel</Button>
            <Button disabled={!readyForImport}>Start import</Button>
        </Modal.Footer>
    </Modal>
}
