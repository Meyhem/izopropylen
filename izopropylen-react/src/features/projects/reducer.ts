
import { Projects } from 'models'
import * as actions from './actions'

import { createReducer, ActionType } from 'typesafe-actions'

const init: Projects = {
    loading: false
}

export default createReducer<Projects, ActionType<typeof actions>>(init)
    .handleAction(actions.fetchProjects.request, (s, a) => ({...s, loading: true, error: undefined}))
    .handleAction(actions.fetchProjects.failure, (s, a) => ({...s, loading: false, error: a.payload}))
    .handleAction(actions.fetchProjects.success, (s, a) => ({...s, loading: false, error: undefined, memberships: a.payload}))