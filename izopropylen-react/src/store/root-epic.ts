import { combineEpics } from 'redux-observable'

import * as auth from '../features/auth/epics'

export const rootEpic = combineEpics(...Object.values(auth))