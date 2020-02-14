import { combineReducers } from 'redux'

import authReducer from '../features/auth/reducer'
import projectsReducer from '../features/projects/reducer'
import { reducer as toasterReducer} from 'react-redux-toastr'

export const makeRootReducer = () => combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    toastr: toasterReducer
})
