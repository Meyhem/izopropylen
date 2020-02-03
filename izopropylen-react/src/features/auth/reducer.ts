import { Auth } from 'models'
import * as actions from './actions'

import { createReducer, ActionType } from 'typesafe-actions'

const init: Auth = {
    loading: false
}

export default createReducer<Auth, ActionType<typeof actions>>(init)
    .handleAction(actions.authenticate.request, (s, a) => ({...s, loading: true, error: undefined}))
    .handleAction(actions.authenticate.failure, (s, a) => ({...s, loading: false, error: a.payload}))
    .handleAction(actions.authenticate.success, (s, a) => ({...s, loading: false, error: undefined}))