import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isBtnDisabled = false;
  hide = true;
  isFormValid = true;

  user: SocialUser;
  loggedIn: boolean;

  emailControl: FormControl;
  passwordControl: FormControl;
  nameControl: FormControl;


  loginForm: FormGroup = new FormGroup({
    nameControl: new FormControl('', []),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  constructor(private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log(user.authToken)
        console.log(user.email)
        console.log(user.name);
      }
    });
  }


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    if (this.isLoginMode) {
      this.authService.login(this.loginForm.value.emailControl, this.loginForm.value.passwordControl).subscribe((result: any) => {
        localStorage.setItem('token', JSON.stringify(result.token));
        this.router.navigate(['/']);
        this._snackBar.open('Successfully Login', null, {
          duration: 3000,
        })
      }, error => {
        console.log(error);
        this._snackBar.open(error.error.message, error.statusText, {
          duration: 9000,
        })
      })
    } else {
      this.authService.signup(this.loginForm.value.nameControl,
        this.loginForm.value.emailControl, this.loginForm.value.passwordControl).subscribe(result => {
          console.log(result);
          this.router.navigate(['/auth']);
          this._snackBar.open('Successfully Signup', null, {
            duration: 3000,
          })
        }, error => {
          this._snackBar.open(error.error.message, error.statusText, {
            duration: 9000,
          })
        })
    }

  }

  signInWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(result => {

      // result will get jwted google token
      this.authService.isAuth.next(true);
      this.router.navigate(['/']);
      this._snackBar.open('Successfully Login', null, {
        duration: 3000,
      })

    }).catch(err => {
      this._snackBar.open(err.error.message, err.statusText, {
        duration: 9000,
      })
    });

  }


  onSwitchMode() {
    this.loginForm.setValue({
      nameControl: '',
      emailControl: '',
      passwordControl: '',
    });
    this.isLoginMode = !this.isLoginMode;
  }



}
