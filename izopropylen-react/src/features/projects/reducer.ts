import { Projects } from 'models'
import * as actions from './actions'

import { createReducer, ActionType } from 'typesafe-actions'

const init: Projects = {
    loading: false,
    translations: {}
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
        (s, a) => ({ ...s, dialogOpen: a.payload.open }))

    .handleAction(actions.fetchProjectDetail.request,
        (s, a) => ({ ...s, loading: true, fetchProjectsError: undefined }))
    .handleAction(actions.fetchProjectDetail.failure,
        (s, a) => ({ ...s, loading: false, fetchProjectsError: a.payload }))
    .handleAction(actions.fetchProjectDetail.success,
        (s, a) => ({ ...s, loading: false, error: undefined, detail: a.payload }))

    .handleAction(actions.toggleCultureCode, (s, a) => ({
        ...s,
        translations: {
            ...s.translations,
            [a.payload.code]: a.payload.show ?
                ({ cultureCode: a.payload.code, loading: false, translations: {} })
                :
                undefined
        }
    }))