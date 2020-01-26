import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AccountService } from '../services/account.service';
import { Login, Register } from '../actions';

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
          map(t => Login.success({token: t.token, expires: new Date(t.expires)})),
          catchError(err => of(Login.error({err})))
        )
      )
    )
  );

  register$ = createEffect(
    () => this.actions$.pipe(
      ofType(Register.begin),
      switchMap(a => this.accountService
        .register(a.username, a.displayName, a.password)
        .pipe<Action, Action>(
          map(() => Register.success()),
          catchError(err => of(Register.error({err})))
        )
      )
    )
  );
}
