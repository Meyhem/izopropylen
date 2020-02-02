import { createAsyncAction } from 'typesafe-actions';

export const authenticate = createAsyncAction(
    'AUTHENTICATE_REQUEST',
    'AUTHENTICATE_SUCCESS',
    'AUTHENTICATE_FAILURE',
)<{username: string, password: string}, {token: string, expiresAt: Date}, Error>();

