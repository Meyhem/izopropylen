import { createAsyncAction } from 'typesafe-actions';
import { AjaxError } from 'rxjs/ajax';

export const authenticate = createAsyncAction(
    'AUTHENTICATE_REQUEST',
    'AUTHENTICATE_SUCCESS',
    'AUTHENTICATE_FAILURE',
)<{username: string, password: string}, {token: string, expiresAt: Date}, AjaxError>();

