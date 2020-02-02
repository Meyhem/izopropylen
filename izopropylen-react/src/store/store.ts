import { RootAction, RootState, RootDeps } from 'models'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'

import { makeRootReducer } from './root-reducer'
import { rootEpic } from './root-epic'
import { makeRestClient, axiosInstance } from '../rest-client'

const rootReducer = makeRootReducer()
const restClient = makeRestClient(axiosInstance)
const dependencies = { rest: restClient }

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, RootDeps>({ dependencies })

export const store = createStore(rootReducer, applyMiddleware(logger, epicMiddleware))

epicMiddleware.run(rootEpic)
