import { createReducer, on, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Login, Register } from '../actions';
import { AuthenticationToken } from '../models/authentication-token';

export interface AccountState {
    token: AuthenticationToken | null;
    error: HttpErrorResponse | null;
}

const init = {
    token: null,
    error: null
};

const reducer = createReducer<AccountState>(init,
    on(Login.success, (s, p) => ({...s, token: p, error: null})),
    on(Login.error, (s, p) => ({...s, token: null, error: p.err})),

    on(Register.success, (s, p) => ({...s, error: null})),
    on(Register.error, (s, p) => ({...s, error: p.err})),
);

export function accountReducer(state: AccountState | undefined, action: Action) {
    return reducer(state, action);
}
