import { RootEpic } from 'models'
import { isActionOf } from 'typesafe-actions'
import { filter, tap, ignoreElements } from 'rxjs/operators'

import { redirect } from './actions'

export const redirect$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(redirect)),
        tap(a => services.history.push(a.payload.to)),
        ignoreElements()
    )
