import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Table, Spinner, Container } from 'react-bootstrap'

import { MainLayout } from '../../common/main-layout'
import { useMemoDispatch } from '../../hooks'
import { fetchProjectDetail, fetchTranslations, clearCultureCodeSelection } from './actions'
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
            <Table bordered={true} responsive={true} striped={true}>
                <thead>
                    <tr>
                        <th>Key</th>
                        {selectedCultureCodes.map(scc => <th key={scc}>{scc}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {translationKeys?.map(tk => <tr key={tk.id}>
                        <td>{tk.name}</td>
                        {selectedCultureCodes.map(scc => {
                            const translationValue = selectTranslationValue(translations[scc], tk.id)
                            return <td key={scc}>
                                <TranslationValueField value={translationValue?.value} />
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
}

const TranslationValueField: React.FC<TranslationValueFieldProps> = React.memo(
    ({ value }) =>
        <span>
            {value}
        </span>
)
