import React, { useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Table, Spinner, Container } from 'react-bootstrap'

import { MainLayout } from '../../common/main-layout'
import { useMemoDispatch } from '../../hooks'
import { fetchProjectDetail, fetchTranslations, clearCultureCodeSelection, setEditMode, saveTranslationValue } from './actions'
import {
    selectTranslationKeys,
    selectCultureCodes,
    selectProjectName,
    selectSelectedCultureCodes,
    selectTranslations,
    selectTranslationValue,
    selectIsLoadingCultureCode
} from './selectors'
import { arrayShallowEqual } from '../../util'

import './project-detail.sass'

export const ProjectDetail = () => {
    const dispatch = useMemoDispatch()
    const { id } = useParams()
    const projectId = Number(id)
    const translationKeys = useSelector(selectTranslationKeys)
    const cultureCodes = useSelector(selectCultureCodes)
    const projectName = useSelector(selectProjectName)
    const selectedCultureCodes = useSelector(selectSelectedCultureCodes, arrayShallowEqual)
    const translations = useSelector(selectTranslations)

    const fetchTranslationsCb = (code: string) => dispatch(fetchTranslations.request({ projectId, code }))
    const clearCultureCodeSelectionCb = (code: string) => dispatch(clearCultureCodeSelection({ code }))
    const setEditModeCb = (code: string, keyId: number, edit: boolean) => dispatch(setEditMode({ code, keyId, edit }))
    const saveTranslationCb = (code: string, keyId: number, value: string) => dispatch(saveTranslationValue.request({ code, keyId, value }))

    React.useEffect(() => {
        dispatch(fetchProjectDetail.request(Number(id)))
    }, [id, dispatch])

    return <MainLayout withContainer={false}>
        <Container>
            <h1>{projectName}</h1>

            {cultureCodes &&
                cultureCodes.map(cc =>
                    <Button
                        disabled={selectIsLoadingCultureCode(translations[cc])}
                        className='m-1'
                        key={cc}
                        value={cc}
                        onClick={() => selectedCultureCodes.includes(cc) ? clearCultureCodeSelectionCb(cc) : fetchTranslationsCb(cc)}
                        variant={selectedCultureCodes.includes(cc) ? 'primary' : 'light'}
                    >
                        {cc} {selectIsLoadingCultureCode(translations[cc]) && <Spinner animation='border' size='sm' />}
                    </Button>)}
        </Container>
        <Container fluid={true}>
            <Table className='translation-table' bordered={true} responsive={true} striped={true}>
                <thead>
                    <tr>
                        <th>Key</th>
                        {selectedCultureCodes.map(scc => <th key={scc}>
                            {scc} {selectIsLoadingCultureCode(translations[scc]) && <Spinner animation='border' size='sm' />}
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {translationKeys?.map(tk => <tr key={tk.id}>
                        <td>{tk.name}</td>
                        {selectedCultureCodes.map(scc => {
                            const translationValue = selectTranslationValue(translations[scc], tk.id)
                            return <td key={scc} onClick={() => !translationValue?.editMode && setEditModeCb(scc, tk.id, true)}>
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
