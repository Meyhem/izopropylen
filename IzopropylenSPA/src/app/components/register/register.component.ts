import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State, selectAccountError } from 'src/app/reducers';
import { Register } from 'src/app/actions';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  accountError$: Observable<HttpErrorResponse>;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required)
  }, this.validatePasswords);

  constructor(private store: Store<State>,
              private messageService: MessageService) { }

  ngOnInit() {
    this.accountError$ = this.store
      .select(selectAccountError);

    this.accountError$.subscribe(e => {
      if (!e) {
        return;
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Register error',
        detail: e && e.error.message || e.message
      });
    });
  }

  validatePasswords(grp: FormGroup) {
    if (!grp.get('password') || grp.get('password').value === grp.get('passwordAgain').value) {
      return {};
    }

    return {
      passwordsMatch: 'Password mismatch'
    };
  }

  get fields() {
    return this.registerForm.controls;
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const form = this.registerForm.value;
    this.store.dispatch(Register.begin({
      username: form.username,
      password: form.password,
      displayName: form.displayName
    }));
  }
}
