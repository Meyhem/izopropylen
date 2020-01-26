import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Redirect } from '../actions';

@Injectable({
    providedIn: 'root'
})
export class CommonEffects {
    constructor(private actions$: Actions,
                private router: Router) { }

    redirect$ = createEffect(() => this.actions$.pipe(
        ofType(Redirect),
        tap((a) => from(this.router.navigate([a.to])))
    ), { dispatch: false });
}
