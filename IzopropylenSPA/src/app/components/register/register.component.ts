import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, NgControlStatus, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('123', Validators.required),
    displayName: new FormControl('123', Validators.required),
    password: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required)
  }, this.validatePasswords);

  constructor() { }

  ngOnInit() { }

  validatePasswords(grp: FormGroup) {
    if (!grp.get('password') || grp.get('password').value === grp.get('passwordAgain').value) {
      return {};
    }

    return {
      passwordAgain: 'Password mismatch'
    };
  }

  register() {
    console.log(this.registerForm);
    if (!this.registerForm.valid) {
      return;
    }
  }

}
