import { createAction, props } from '@ngrx/store';

export const Redirect = createAction('[Redirect]', props<{to: string}>());
