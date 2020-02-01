import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, selectAccountToken } from '../reducers';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store: Store<State>,
                private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select(selectAccountToken())
            .pipe(
                map(tok => tok && tok.expires > new Date()),
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['login']);
                    }
                })
            );
    }
}
