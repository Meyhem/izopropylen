import { AccountState } from './account-reducer';
import { ActionReducer } from '@ngrx/store';

export * from './account-reducer';

export interface State {
    account: AccountState;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        const newState = reducer(state, action);

        console.groupCollapsed(action.type);
        console.log('prev-state', state);
        console.log('action', action);
        console.log('next-state', newState);
        console.groupEnd();

        return newState;
    };
}

export const selectAccountError = (s: State) => s.account.error;

export const selectAccountToken = (s: State) => s.account.token;
