import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { State, selectAccountError } from '../../reducers';
import { Login } from '../../actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  accountError$: Observable<HttpErrorResponse>;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private store: Store<State>, private messageService: MessageService) {
    this.accountError$ = store.select(selectAccountError)
      .pipe(takeUntil(this.destroyed$));

    this.accountError$
      .subscribe({
        next: e => {
          if (!e) {
            return;
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Login error',
            detail: e && e.error.message || e.message
          });
        }
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const values = this.form.value;
    this.store.dispatch(Login.begin({ username: values.username, password: values.password }));
  }
}
