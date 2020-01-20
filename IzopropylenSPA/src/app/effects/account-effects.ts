import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { Login } from '../actions';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountEffects {
  constructor(private actions$: Actions,
              private accountService: AccountService) { }

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login.begin),
      switchMap(a => this.accountService
        .authenticate(a.username, a.password)
        .pipe<Action, Action>(
          map(t => Login.success({token: t.token})),
          catchError(err => of(Login.error({err})))
        )
      )
    )
  );
}
