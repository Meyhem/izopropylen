import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationToken } from '../models/authentication-token';

export const StoreToken = createAction('[StoreToken]', props<AuthenticationToken>());

export const Login = {
    begin: createAction('[Login] begin', props<{username: string, password: string, successRedirect?: string}>()),
    success: createAction('[Login] success'),
    error: createAction('[Login] error', props<{err: HttpErrorResponse}>())
};

export const Register = {
    begin: createAction('[Register] begin', props<{username: string, displayName: string, password: string, successRedirect?: string}>()),
    success: createAction('[Register] success'),
    error: createAction('[Register] error', props<{err: HttpErrorResponse}>())
};

// export const setToken = createAction(
//     '[LOGIN] login',
//     props<{token: string}>()
// );
