import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../services/auth.facade';
import { User } from '../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserTypeEnum } from '../../../shared/enums/user-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthFacade,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginLoading$ = this.auth.getLoginLoading$();
  }

  get usernameFormControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth.login$(this.usernameFormControl.value, this.passwordFormControl.value)
      .subscribe({
        next: (user: User) => this.router.navigate([user.type === UserTypeEnum.USER ? '/' : '/organization']),
        error: (err: HttpErrorResponse) => {
          this.snackbar.open(err.message);
          this.passwordFormControl.reset();
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
