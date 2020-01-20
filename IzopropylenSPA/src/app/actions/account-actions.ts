import { createAction, props } from '@ngrx/store';

export const Login = {
    begin: createAction('[Login] begin', props<{username: string, password: string}>()),
    success: createAction('[Login] success', props<{token: string}>()),
    error: createAction('[Login] error', props<{err: Error}>())
};

// export const setToken = createAction(
//     '[LOGIN] login',
//     props<{token: string}>()
// );
