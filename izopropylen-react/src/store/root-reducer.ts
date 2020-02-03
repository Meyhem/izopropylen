import { combineReducers } from 'redux'

import authReducer from '../features/auth/reducer'
import projectsReducer from '../features/projects/reducer'

export const makeRootReducer = () => combineReducers({
    auth: authReducer,
    projects: projectsReducer
})
