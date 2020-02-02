import { ActionType, StateType } from 'typesafe-actions'
import { Epic } from 'redux-observable'

import * as actions from './root-action'
import { makeRestClient } from '../rest-client'
import { history } from '../history'

declare module 'models' {

    export type RootState = StateType<ReturnType<typeof import('./root-reducer').makeRootReducer>>
    export type RootAction = ActionType<typeof actions>;
    export type RootDeps = {
        rest: ReturnType<typeof makeRestClient>,
        history: typeof history
    }
    export type RootEpic = Epic<RootAction, RootAction, RootState, RootDeps>
}