import { RootAction, RootState, RootDeps } from 'models'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import Axios from 'axios-observable'

import { history } from '../history'
import { makeRootReducer } from './root-reducer'
import { rootEpic } from './root-epic'
import { makeRestClient } from '../rest-client'
import { makeAuthTokenPersistenceMiddleware, getStoredAuthToken, setAuthorizationHeader } from '../util'
import { API_URL } from '../const'

const storedToken = getStoredAuthToken()
const rootReducer = makeRootReducer()
const axios = Axios.create({
    baseURL: API_URL,
    timeout: 5000
})
if (storedToken) {
    setAuthorizationHeader(axios, storedToken.token)
}
const authMiddleware = makeAuthTokenPersistenceMiddleware(axios)
const restClient = makeRestClient(axios)
const dependencies = { rest: restClient, history }

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, RootDeps>({ dependencies })

const init: Partial<RootState> = {
    auth: { loading: false, token: storedToken?.token, expiresAt: storedToken?.expiresAt },
}

export const store = createStore(rootReducer, init, applyMiddleware(logger, epicMiddleware, authMiddleware))

epicMiddleware.run(rootEpic)
