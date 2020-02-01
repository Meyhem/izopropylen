import { ActionType, StateType } from 'typesafe-actions';

import * as actions from './root-action';
import rootReducer from './root-reducer';

declare module 'Models' {

    export type RootState = StateType<ReturnType<rootReducer>>
    export type RootAction = ActionType<typeof actions>;

}