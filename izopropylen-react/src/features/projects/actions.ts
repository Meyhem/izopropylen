import { ProjectMembership, ProjectDetail, TranslationValue } from 'models'
import { createAsyncAction, createAction } from 'typesafe-actions'
import { AxiosError } from 'axios'

export const fetchProjects = createAsyncAction(
    'FETCH_PROJECTS_REQUEST',
    'FETCH_PROJECTS_SUCCESS',
    'FETCH_PROJECTS_FAILURE'
)<void, ProjectMembership[], AxiosError>()

export const createProject = createAsyncAction(
    'CREATE_PROJECT_REQUEST',
    'CREATE_PROJECT_SUCCESS',
    'CREATE_PROJECT_FAILURE'
)<{name: string}, void, AxiosError>()

export const toggleDialog = createAction('TOGGLE_DIALOG')<{open: boolean}>()

export const fetchProjectDetail = createAsyncAction(
    'FETCH_PROJECT_DETAIL_REQUEST',
    'FETCH_PROJECT_DETAIL_SUCCESS',
    'FETCH_PROJECT_DETAIL_FAILURE'
)<number, ProjectDetail, AxiosError>()

export const clearCultureCodeSelection = createAction('CLEAR_CULTURE_CODE_SELECTION')<{code: string}>()

export const fetchTranslations = createAsyncAction(
    'FETCH_TRANSLATIONS_REQUEST',
    'FETCH_TRANSLATIONS_SUCCESS',
    'FETCH_TRANSLATIONS_FAILURE'
)<{projectId: number, code: string}, {code: string, translations: {[keyId: number]: TranslationValue}}, AxiosError>()

export const setEditMode = createAction('SET_EDIT_MODE')<{code: string, keyId: number, edit: boolean}>()

export const saveTranslationValue = createAsyncAction(
    'SAVE_TRANSLATION_REQUEST',
    'SAVE_TRANSLATION_SUCCESS',
    'SAVE_TRANSLATION_FAILURE'
)<{code: string, keyId: number, value: string}, {code: string, keyId: number, value: string}, AxiosError>()