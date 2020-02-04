import { AxiosError } from 'axios'

declare module 'models' {
    export enum ProjectRole {
        Admin = 'Admin',
        Editor = 'Editor',
        Viewer = 'Viewer'
    }

    export interface ProjectMembership {
        projectId: number
        name: string
        role: ProjectRole
    }

    export interface Projects {
        memberships?: ProjectMembership[]
        loading: boolean
        dialogOpen?: boolean
        fetchProjectsError?: AxiosError
        createProjectError?: AxiosError
    }
}