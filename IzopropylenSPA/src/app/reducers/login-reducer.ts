import { createReducer, on, Action } from '@ngrx/store';
import { Login } from '../actions';

export interface AccountState {
    token: string | null;
    error: string | null;
}

const init = {
    token: null,
    error: null
};

const reducer = createReducer<AccountState>(init,
    on(Login.success, (s, p) => ({...s, token: p.token, error: null})),
    on(Login.error, (s, p) => ({...s, token: null, error: p.err.message})),
);

export function accountReducer(state: AccountState | undefined, action: Action) {
    return reducer(state, action);
}
