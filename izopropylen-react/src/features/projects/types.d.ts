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

    export interface TranslationKey {
        id: number
        name: string
    }

    export interface ProjectDetail {
        id: number
        name: string
        keys: TranslationKey[]
        cultureCodes: string[]
    }

    export interface TranslationGroup {
        cultureCode: string
        translations: { [keyId: number]: TranslationValue }

        loading: boolean
    }

    export interface TranslationValue {
        valueId: number
        value: string

        editMode?: boolean
        loading?: boolean
    }

    export interface Projects {
        memberships?: ProjectMembership[]
        detail?: ProjectDetail
        translations: { [code: string]: TranslationGroup | undefined }

        loading: boolean
        dialogOpen?: boolean

        fetchProjectsError?: AxiosError
        createProjectError?: AxiosError
        fetchTranslationError?: AxiosError
    }
}
