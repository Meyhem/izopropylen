import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsTokenValidAt } from '../features/auth/selectors'
import { now } from '../util'
import { Redirect, RouteProps, Route } from 'react-router-dom'

interface Props {
    fallbackRoute: string
}

export const ProtectedRoute: React.FC<Props & RouteProps> = ({fallbackRoute, ...rest}) => {
    const valid = useSelector(selectIsTokenValidAt(now()))

    return <>{valid ? <Route {...rest}/> : <Redirect to={fallbackRoute} />}</>
}
