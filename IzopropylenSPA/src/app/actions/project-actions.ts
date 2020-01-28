import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectMembership } from '../reducers';

export const FetchProjectMemberships = {
    begin: createAction('[FetchProjectMemberships] begin'),
    success: createAction('[FetchProjectMemberships] success', props<{ memberships: ProjectMembership[] }>()),
    error: createAction('[FetchProjectMemberships] error', props<{ err: HttpErrorResponse }>())
};
