declare module 'models' {
    export interface Auth {
        token?: string
        expiresAt?: Date
        error?: import('rxjs/ajax').AjaxError
        loading: boolean
    }
}