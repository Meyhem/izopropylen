import { Projects } from 'models'
import produce from 'immer'

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

    .handleAction(actions.clearCultureCodeSelection, (s, a) => ({
        ...s,
        translations: {
            ...s.translations,
            [a.payload.code]: undefined
        }
    }))
    .handleAction(actions.fetchTranslations.request,
        (s, a) => ({
            ...s,
            translations: {
                ...s.translations,
                [a.payload.code]: ({
                    cultureCode: a.payload.code,
                    loading: true,
                    translations: {}
                })

            }
        }))
    .handleAction(actions.fetchTranslations.failure,
        (s, a) => ({ ...s, loading: false, fetchTranslationError: a.payload }))
    .handleAction(actions.fetchTranslations.success,
        (s, a) => ({
            ...s,
            translations: {
                ...s.translations,
                [a.payload.code]: {
                    cultureCode: a.payload.code,
                    loading: false,
                    translations: a.payload.translations
                }
            }
        }))

    .handleAction(actions.setEditMode, (s, a) => produce(s, draft => {
        const group = draft.translations[a.payload.code]
        if (group) {
            group.translations[a.payload.keyId].editMode = a.payload.edit
        }
    }))