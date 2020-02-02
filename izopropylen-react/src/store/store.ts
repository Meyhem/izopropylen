import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { makeRootReducer } from './root-reducer'

const rootReducer = makeRootReducer()

export const store = createStore(rootReducer, applyMiddleware(logger))