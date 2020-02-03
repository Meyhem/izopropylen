import { RootEpic, ProjectRole } from 'models'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { map, filter, switchMap, catchError } from 'rxjs/operators'

import { fetchProjects } from './actions'

export const fetchProjects$: RootEpic = (action$, state$, services) =>
    action$.pipe(
        filter(isActionOf(fetchProjects.request)),
        switchMap(a => services.rest.fetchProjects()
            .pipe(
                map(res => fetchProjects.success(res.data.map(m =>
                    ({projectId: m.projectId, role: m.role as ProjectRole, name: m.name})))),
                catchError(err => of(fetchProjects.failure(err)))
            )
        )
    )
