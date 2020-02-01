import { Auth } from 'Models';
import * as actions from './actions';

import { createReducer, ActionType } from 'typesafe-actions';

const init: Auth = {
    loading: false
}

export default createReducer<Auth, ActionType<typeof actions>>(init)
    .handleAction([actions.authenticate.request], (s, a) => ({...s, loading: true}));