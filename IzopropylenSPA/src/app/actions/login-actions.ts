import { createAction, props } from '@ngrx/store';

export const setToken = createAction(
    '[LOGIN] login',
    props<{token: string}>()
);
