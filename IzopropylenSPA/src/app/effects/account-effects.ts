import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap, throttleTime } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { Login, Register, StoreToken } from '../actions';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})
export class AccountEffects {
  constructor(private actions$: Actions,
              private accountService: AccountService,
              private utilService: UtilService,
              private router: Router) { }

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login.begin),
      switchMap(a => this.accountService
        .authenticate(a.username, a.password)
        .pipe(
          throttleTime(1000),
          switchMap(t => [
            Login.success(),
            StoreToken({token: t.token, expires: new Date(t.expires)})
          ]),
          tap(() => {
            if (typeof a.successRedirect !== 'undefined') {
              this.router.navigate(['']);
            }
          }),
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
        .pipe(
          map(() => Register.success()),
          tap(() => {
            if (typeof a.successRedirect !== 'undefined') {
              this.router.navigate([a.successRedirect]);
            }
          }),
          catchError(err => of(Register.error({err})))
        )
      )
    )
  );

  storeToken$ = createEffect(
    () => this.actions$.pipe(
      ofType(StoreToken),
      tap(t => this.utilService.storeToken(t))
    ), { dispatch: false }
  );
}
