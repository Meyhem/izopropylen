import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, flatMap } from 'rxjs/operators';

import { FetchProjectMemberships } from '../actions/project-actions';
import { selectAccountToken, State, AuthenticationToken } from '../reducers';
import { ProjectService } from '../services/project.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectEffects {
    constructor(private actions$: Actions,
                private store: Store<State>,
                private router: Router,
                private projectService: ProjectService) { }

    fetchProjects$ = createEffect(
        () => this.actions$.pipe(
            ofType(FetchProjectMemberships.begin),
            switchMap(a => this.store.select(selectAccountToken())),
            flatMap((token: AuthenticationToken) =>
                this.projectService.fetchMyProjects(token.token)),
            map((res: any[]) => FetchProjectMemberships.success({
                memberships: res.map(r => ({projectId: r.projectId, name: r.name, role: r.role}))
            })),
            catchError(err => of(FetchProjectMemberships.error({err})))
        )
    );
}
