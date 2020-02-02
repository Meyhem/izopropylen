declare module 'models' {
    export interface Auth {
        token?: string
        expiresAt?: Date
        error?: Error
        loading: boolean
    }
}