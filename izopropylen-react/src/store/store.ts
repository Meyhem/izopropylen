import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import createRootReducer from './root-reducer';

const rootReducer = createRootReducer()

export default createStore(rootReducer, applyMiddleware(logger))