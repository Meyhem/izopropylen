import React from 'react'
import { useDispatch } from 'react-redux'

import { MainLayout } from '../../common/main-layout'
import { fetchProjects } from './actions'
import { useMemoDispatch } from '../../hooks'

export const MyProjects = () => {
    const dispatch = useMemoDispatch()

    React.useEffect(() => {
        dispatch(fetchProjects.request())
    }, [])

    return <MainLayout>
        123
    </MainLayout>
}
