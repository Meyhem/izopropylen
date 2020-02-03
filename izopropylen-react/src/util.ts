import { Dispatch, AnyAction } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { authenticate } from './features/auth/actions'
import Axios from 'axios-observable'

const LS_TOKEN_KEY = 'AUTH_TOKEN'

export const now = () => new Date()

export const setAuthorizationHeader = (axios: Axios, token: string) => {
    axios.defaults.headers = {
        'Authorization': `Bearer ${token}`
    }
}

export const makeAuthTokenPersistenceMiddleware =
    (axios: Axios) =>
    () =>
        (next: Dispatch) =>
            (action: AnyAction) => {
                if (isActionOf(authenticate.success, action)) {
                    localStorage.setItem(LS_TOKEN_KEY, JSON.stringify(action.payload))
                    setAuthorizationHeader(axios, action.payload.token)
                }

                next(action)
            }

export const getStoredAuthToken = (): {token: string, expiresAt: Date} | null => {
    const tok = JSON.parse(localStorage.getItem(LS_TOKEN_KEY) as string)
    if (!tok) return null

    tok.expiresAt = new Date(tok.expiresAt)
    if (tok.expiresAt < new Date()) {
        return null
    }

    return tok
}