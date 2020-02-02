import { combineReducers } from 'redux'

import authReducer from '../features/auth/reducer'

export const makeRootReducer = () => combineReducers({
    auth: authReducer
})
