import { RootEpic } from 'models'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, switchMap, catchError, concatMap } from 'rxjs/operators'

import { authenticate } from './actions'
import { redirect } from '../app/actions'

export const authenticate$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(authenticate.request)),
        switchMap(a => services.rest.authenticate(a.payload.username, a.payload.password)
            .pipe(
                concatMap(res => [
                    authenticate.success({ token: res.data.token, expiresAt: new Date(res.data.expires) }),
                    redirect({to: '/'})
                ]),
                catchError(err => of(authenticate.failure(err)))
            )
        )
    )
