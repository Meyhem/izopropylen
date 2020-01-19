import { createReducer, on, Action } from '@ngrx/store';

import { setToken } from '../actions/index';

export interface LoginState {
    token: string | null;
}

const init = {
    token: null
};

const reducer = createReducer<LoginState>(init,
    on(setToken, (s, p ) => ({...s, token: p.token}))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    return reducer(state, action);
}
