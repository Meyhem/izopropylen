import { createAction } from 'typesafe-actions'
import { actions as toastr} from 'react-redux-toastr'
import { AxiosError } from 'axios'

export const redirect = createAction('REDIRECT')<{to: string}>()

export const addToasterFromAxiosError = (err: AxiosError) =>
    toastr.add({ type: 'error', message: err.response?.data || `Unknown error: ${err.message}`, title: 'Error'}) as any