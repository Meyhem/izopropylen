import { createAsyncAction } from 'typesafe-actions';

export const authenticate = createAsyncAction(
    'AUTHENTICATE_REQUEST',
    'AUTHENTICATE_SUCCESS',
    'AUTHENTICATE_FAILURE',
)<undefined, {username: string, password: string}, Error>();

