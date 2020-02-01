import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createReducer, on, Action, createAction, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, flatMap } from 'rxjs/operators';
import { State, selectAccountToken, AuthenticationToken } from '../reducers';
import { ProjectService } from '../services/project.service';

export interface ProjectMembership {
    projectId: number;
    name: string;
    role: string;
}

export interface ProjectState {
    memberships: ProjectMembership[] | null;
}

const init: ProjectState = {
    memberships: null
};


export const FetchProjectMemberships = {
    begin: createAction('[FetchProjectMemberships] begin'),
    success: createAction('[FetchProjectMemberships] success', props<{ memberships: ProjectMembership[] }>()),
    error: createAction('[FetchProjectMemberships] error', props<{ err: HttpErrorResponse }>())
};

export const FetchProjectDetail = {
    begin: createAction('[FetchProjectDetail] begin', props<{id: number}>()),
    success: createAction('[FetchProjectDetail] success', props<{ memberships: ProjectMembership[] }>()),
    error: createAction('[FetchProjectDetail] error', props<{ err: HttpErrorResponse }>())
};



const reducer = createReducer<ProjectState>(init,
    on(FetchProjectMemberships.success, (s, p) => ({...s, memberships: p.memberships}))
);

export function projectReducer(state: ProjectState | undefined, action: Action) {
    return reducer(state, action);
}

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

    fetchProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(FetchProjectDetail.begin),

        )
    );
}
