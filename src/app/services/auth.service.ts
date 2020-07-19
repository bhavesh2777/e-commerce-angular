import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isAuth = new Subject<Boolean>();

  constructor(private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) { }
  url = `http://localhost:3000/auth`;

  login(email, password) {
    return this.http.post(this.url + `/login`, { email: email, password: password }).pipe(tap(res => {
      this.isAuth.next(true);
    }))
  }


  signup(name, email, password) {
    return this.http.post(this.url + '/signup', { name: name, email: email, password: password })
  }

  // oauthGoogle(authToken) {
  //   return this.http.post(this.url + `/google`, { authToken: authToken });
  // }

  logout() {
    this.isAuth.next(false);
    this.socialAuthService.signOut();
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }


}
