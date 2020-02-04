import { combineEpics } from 'redux-observable'

import * as auth from '../features/auth/epics'
import * as projects from '../features/projects/epics'
import * as app from '../features/app/epics'

export const rootEpic = combineEpics(
    ...Object.values(auth),
    ...Object.values(projects),
    ...Object.values(app)
)
