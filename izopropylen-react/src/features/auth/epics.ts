import { RootEpic } from 'models'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators'

import { authenticate } from './actions'

export const authenticate$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(authenticate.request)),
        switchMap(a => services.rest.authenticate(a.payload.username, a.payload.password)
            .pipe(
                map(res => authenticate.success({ token: res.data.token, expiresAt: new Date(res.data.expiresAt) })),
                tap(() => {
                    services.history.push('/')
                }),
                catchError(err => of(authenticate.failure(err)))
            )
        )
    )
