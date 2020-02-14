import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    Button,
    Table,
    Spinner,
    Container,
    Form,
    InputGroup,
    Row,
    Col,
    Dropdown
} from 'react-bootstrap'

import { MainLayout } from '../../common/main-layout'
import { ConfirmationDialog } from '../../common/confirmation-dialog'
import { useDispatchingCallback } from '../../hooks'
import {
    fetchProjectDetail,
    fetchTranslations,
    clearCultureCodeSelection,
    setEditMode,
    saveTranslationValue,
    createKey,
    setNewKeyName,
    addNewCultureCode,
    deleteCultureCode
} from './actions'
import {
    selectTranslationKeys,
    selectCultureCodes,
    selectProjectName,
    selectSelectedCultureCodes,
    selectTranslations,
    selectTranslationValue,
    selectIsLoadingCultureCode,
    selectNewKeyName,
    selectIsLoadingAnyCode
} from './selectors'
import { arrayShallowEqual } from '../../util'
import { getCultureCodes, getCultureName } from '../../cultures'

import './project-detail.sass'

export const ProjectDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const projectId = Number(id)
    const cultureList = useMemo(getCultureCodes, [])
    const [deleteCodeCandidate, setDeleteCodeCandidate] = useState<string | undefined>(undefined)

    const translationKeys = useSelector(selectTranslationKeys)
    const cultureCodes = useSelector(selectCultureCodes)
    const projectName = useSelector(selectProjectName)
    const selectedCultureCodes = useSelector(selectSelectedCultureCodes, arrayShallowEqual)
    const isLoadingAnyCode = useSelector(selectIsLoadingAnyCode)
    const translations = useSelector(selectTranslations)
    const newKeyName = useSelector(selectNewKeyName)

    const fetchTranslationsCb = useDispatchingCallback(d => (code: string) => d(fetchTranslations.request({ projectId, code })))
    const clearCultureCodeSelectionCb = useDispatchingCallback(d => (code: string) => d(clearCultureCodeSelection({ code })))
    const setEditModeCb = useDispatchingCallback(d => (code: string, keyId: number, edit: boolean) => d(setEditMode({ code, keyId, edit })))
    const saveTranslationCb = useDispatchingCallback(d => (code: string, keyId: number, value: string) => d(saveTranslationValue.request({ code, keyId, value })))
    const createKeyCb = useDispatchingCallback(d => (keyName: string) => d(createKey.request({ projectId, keyName })))
    const setNewKeyNameCb = useDispatchingCallback(d => (value: string) => d(setNewKeyName({ value })))
    const addNewCultureCodeCb = useDispatchingCallback(d => (code: string) => d(addNewCultureCode({code})))
    const deleteCultureCodeCb = useDispatchingCallback(d => (code: string) => d(deleteCultureCode.request({code, projectId})))

    useEffect(() => {
        dispatch(fetchProjectDetail.request(Number(id)))
    }, [id, dispatch])

    return <MainLayout withContainer={false}>
        {deleteCodeCandidate && <ConfirmationDialog
            show={true}
            data={deleteCodeCandidate}
            title={`Delete culture code ${deleteCodeCandidate}`}
            text={`Are you sure you want to delete '${deleteCodeCandidate}' ? All translated texts will be LOST FOREVER!`}
            variant='danger'
            onCancel={() => setDeleteCodeCandidate(undefined)}
            onConfirm={(code: string) => {
                deleteCultureCodeCb(code)
                setDeleteCodeCandidate(undefined)
            }}
        />}
        <Container>
            <h1>{projectName}</h1>

            {cultureCodes &&
                <>
                    {cultureCodes.map(cc =>
                        <Button
                            disabled={selectIsLoadingCultureCode(translations[cc])}
                            className='m-1'
                            key={cc}
                            value={cc}
                            onClick={() => selectedCultureCodes.includes(cc) ? clearCultureCodeSelectionCb(cc) : fetchTranslationsCb(cc)}
                            variant={selectedCultureCodes.includes(cc) ? 'primary' : 'light'}
                        >
                            {cc} {selectIsLoadingCultureCode(translations[cc]) && <Spinner animation='border' size='sm' />}
                        </Button>
                    )}
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle
                            variant='success'
                            id='dropdown-basic'
                            disabled={isLoadingAnyCode}
                        >
                            Add new language
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='select-menu-limit'>
                            {cultureList.map(cc =>
                                <Dropdown.Item key={cc} as='button' onClick={() => addNewCultureCodeCb(cc)}>
                                    {getCultureName(cc)} ({cc})
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </>}
        </Container>
        <Container fluid={true}>
            <Row>
                <Col xs={5}>
                    <InputGroup className='mb-2 mt-2'>
                        <Form.Control
                            type='text'
                            value={newKeyName || ''}
                            onChange={(e: any) => setNewKeyNameCb(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                onClick={() => newKeyName && createKeyCb(newKeyName)}
                                disabled={!newKeyName}
                            >
                                New key +
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Table className='translation-table' bordered={true} responsive={true} striped={true}>
                <thead>
                    <tr>
                        <th>Key</th>
                        {selectedCultureCodes.map(scc => <th key={scc}>
                            {scc} {selectIsLoadingCultureCode(translations[scc]) && <Spinner animation='border' size='sm' />}
                            <span
                                className='delete-culture-code-button'
                                onClick={() => setDeleteCodeCandidate(scc)}
                            >
                                &#x2297;
                            </span>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {translationKeys?.map(tk => <tr key={tk.id}>
                        <td>{tk.name}</td>
                        {selectedCultureCodes.map(scc => {
                            const translationValue = selectTranslationValue(translations[scc], tk.id)
                            return <td key={`${scc}-${tk.id}`} onClick={() => !translationValue?.editMode && setEditModeCb(scc, tk.id, true)}>
                                <TranslationValueField
                                    value={translationValue?.value}
                                    editMode={!!translationValue?.editMode}
                                    onDone={() => setEditModeCb(scc, tk.id, false)}
                                    onCommit={v => saveTranslationCb(scc, tk.id, v)}
                                />
                            </td>
                        })}
                    </tr>)}
                </tbody>
            </Table>
        </Container>
    </MainLayout>
}

interface TranslationValueFieldProps {
    value: string | undefined
    editMode: boolean
    onCommit: (v: string) => void
    onDone: () => void
}

const TranslationValueField: React.FC<TranslationValueFieldProps> = React.memo(
    ({ value, editMode, onCommit, onDone }) => {
        const fieldRef = useRef<HTMLInputElement>()
        const [uncommited, setUncommited] = useState('')
        const setUncommitedCb = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => setUncommited(evt.target.value), [])

        React.useEffect(() => {
            if (editMode) {
                fieldRef.current!.focus()
                setUncommited(value || '')
            }
            // eslint-disable-next-line
        }, [editMode])

        const keyHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Escape':
                    return onDone()
                case 'Enter':
                    return onCommit((e.target as any).value)
            }
        }, [onDone, onCommit])

        return <span>
            {!editMode && value}
            {editMode && <input
                ref={r => fieldRef.current = r!}
                className='form-control'
                type='text'
                value={uncommited}
                onChange={setUncommitedCb}
                onBlur={e => onCommit(e.target.value)}
                onKeyUp={keyHandler}
            />}
        </span>
    }

)
