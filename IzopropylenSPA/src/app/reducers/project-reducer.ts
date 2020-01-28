import { createReducer, on, Action } from '@ngrx/store';
import { FetchProjectMemberships } from '../actions/project-actions';

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

const reducer = createReducer<ProjectState>(init,
    on(FetchProjectMemberships.success, (s, p) => ({...s, memberships: p.memberships}))
);

export function projectReducer(state: ProjectState | undefined, action: Action) {
    return reducer(state, action);
}
