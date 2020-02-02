declare module 'models' {
    export interface Auth {
        token?: string
        expiresAt?: Date
        error?: import('axios').AxiosError
        loading: boolean
    }
}