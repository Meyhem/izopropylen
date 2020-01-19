import { LoginState } from './login-reducer';
import { ActionReducer } from '@ngrx/store';

export * from './login-reducer';

export interface State {
    login: LoginState;
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
