import { ActionType, StateType } from 'typesafe-actions'
import { Epic } from 'redux-observable'

import * as actions from './root-action'
import { makeRestClient } from '../rest-client'


declare module 'models' {

    export type RootState = StateType<ReturnType<typeof import('./root-reducer').makeRootReducer>>
    export type RootAction = ActionType<typeof actions>;
    export type RootDeps = {
        rest: ReturnType<typeof makeRestClient>
    }
    export type RootEpic = Epic<RootAction, RootAction, RootState, RootDeps>
}