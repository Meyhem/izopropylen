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
}