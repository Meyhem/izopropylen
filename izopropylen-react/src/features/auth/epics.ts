import { RootEpic } from 'models'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, filter, switchMap, catchError } from 'rxjs/operators'

import { authenticate } from './actions'
import { formatApiUrl } from '../../util'

export const authenticate$: RootEpic = (action$, state$, { }) =>
    action$.pipe(
        filter(isActionOf(authenticate.request)),
        switchMap(r => ajax.post(formatApiUrl('/accounts/token'), r.payload)),
        map(res => authenticate.success({ token: '', expiresAt: new Date() })),
        catchError(err => of(authenticate.failure(err)))
    )
