import { ActionType, StateType } from 'typesafe-actions';

import * as actions from './root-action';
import { Epic } from 'redux-observable';

declare module 'models' {

    export type RootState = StateType<ReturnType<typeof import('./root-reducer').makeRootReducer>>
    export type RootAction = ActionType<typeof actions>;
    export type RootEpic = Epic<RootAction, RootAction, RootState>
}