import { ProjectMembership } from 'models'
import { createAsyncAction } from 'typesafe-actions'
import { AxiosError } from 'axios'

export const fetchProjects = createAsyncAction(
    'FETCH_PROJECTS_REQUEST',
    'FETCH_PROJECTS_SUCCESS',
    'FETCH_PROJECTS_FAILURE'
)<void, ProjectMembership[], AxiosError>()
