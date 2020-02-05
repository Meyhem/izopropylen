import { ProjectMembership, ProjectDetail } from 'models'
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

export const toggleCultureCode = createAction('TOGGLE_CULTURE_CODE')<{code: string, show: boolean}>()
