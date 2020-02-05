import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'

import { MainLayout } from '../../common/main-layout'
import { useMemoDispatch } from '../../hooks'
import { fetchProjectDetail, toggleCultureCode } from './actions'
import { selectTranslationKeys, selectCultureCodes, selectProjectName, selectSelectedCultureCodes } from './selectors'
import { arrayShallowEqual } from '../../util'

export const ProjectDetail = () => {
    const dispatch = useMemoDispatch()
    const { id } = useParams()
    const translationKeys = useSelector(selectTranslationKeys)
    const cultureCodes = useSelector(selectCultureCodes)
    const projectName = useSelector(selectProjectName)
    const selectedCultureCodes = useSelector(selectSelectedCultureCodes, arrayShallowEqual)

    const toggleCultureCodeCb = (code: string, show: boolean) => dispatch(toggleCultureCode({code, show}))

    React.useEffect(() => {
        dispatch(fetchProjectDetail.request(Number(id)))
    }, [id, dispatch])

    return <MainLayout>
        <h1>{projectName}</h1>

        {cultureCodes &&
            cultureCodes.map(cc =>
                <Button
                    className='m-1'
                    key={cc}
                    value={cc}
                    onClick={() => toggleCultureCodeCb(cc, !selectedCultureCodes.includes(cc))}
                    variant={selectedCultureCodes.includes(cc) ? 'primary' : 'light'}
                >
                    {cc}
                </Button>)}
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
                    {selectedCultureCodes.map(scc => <td key={scc}>{scc}</td>)}
                </tr>)}
            </tbody>
        </Table>
    </MainLayout>
}
