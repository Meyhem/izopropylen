import { Projects } from 'models'
import * as actions from './actions'

import { createReducer, ActionType } from 'typesafe-actions'

const init: Projects = {
    loading: false
}

export default createReducer<Projects, ActionType<typeof actions>>(init)
    .handleAction(actions.fetchProjects.request,
        (s, a) => ({ ...s, loading: true, fetchProjectsError: undefined }))
    .handleAction(actions.fetchProjects.failure,
        (s, a) => ({ ...s, loading: false, fetchProjectsError: a.payload }))
    .handleAction(actions.fetchProjects.success,
        (s, a) => ({ ...s, loading: false, error: undefined, memberships: a.payload }))
    .handleAction(actions.createProject.request,
        (s, a) => ({ ...s, loading: true, createProjectError: undefined }))
    .handleAction(actions.createProject.failure,
        (s, a) => ({ ...s, loading: false, createProjectError: a.payload }))
    .handleAction(actions.createProject.success,
        (s, a) => ({ ...s, loading: false, error: undefined }))
    .handleAction(actions.toggleDialog,
        (s, a) => ({...s, dialogOpen: a.payload.open}))