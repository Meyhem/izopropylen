import { Projects } from 'models'
import produce from 'immer'

import * as actions from './actions'

import { createReducer, ActionType } from 'typesafe-actions'

const init: Projects = {
    loading: false,
    translations: {},
    detail: {
        showImportDialog: false,
        importRunning: false,
        importedKeys: 0,
        importTotalKeys: 0,
        newKeyName: ''
    }
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
        (s, a) => produce(s, draft => {
            draft.loading = false
            draft.detail.id = a.payload.id
            draft.detail.name = a.payload.name
            draft.detail.cultureCodes = a.payload.cultureCodes
            draft.detail.keys = a.payload.keys
        }))

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
            if (!group.translations[a.payload.keyId]) {
                group.translations[a.payload.keyId] = {valueId: 0, value: ''}
            }
            group.translations[a.payload.keyId].editMode = a.payload.edit
        }
    }))

    .handleAction(actions.saveTranslationValue.success, (s, a) => produce(s, draft => {
        const group = draft.translations[a.payload.code]
        if (group) {
            group.translations[a.payload.keyId].value = a.payload.value
        }
    }))

    .handleAction(actions.setNewKeyName, (s, a) => produce(s, draft => {
        if (draft.detail) {
            draft.detail.newKeyName = a.payload.value
        }
    }))

    .handleAction(actions.createKey.success, (s, a) => produce(s, draft => {
        draft.detail.keys?.unshift({ id: a.payload.keyId, name: a.payload.keyName })
        for (const cc of Object.keys(draft.translations)) {
            if (draft.translations[cc]) {
                draft.translations[cc]!.translations[a.payload.keyId] = { value: '', valueId: 0}
            }
        }
    }))

    .handleAction(actions.addNewCultureCode, (s, a) => produce(s, draft => {
        draft.detail.cultureCodes?.push(a.payload.code)
        draft.translations[a.payload.code] = {
            cultureCode: a.payload.code,
            translations: {},
            loading: false
        }
    }))

    .handleAction(actions.deleteCultureCode.success, (s, a) => produce(s, draft => {
        draft.detail.cultureCodes?.splice(draft.detail.cultureCodes?.indexOf(a.payload.code), 1)

        draft.translations[a.payload.code] = undefined
    }))

    .handleAction(actions.showImportDialog, (s, a) => produce(s, draft => {
        draft.detail.showImportDialog = a.payload.show
    }))