import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: Boolean = false;
  sub: Subscription;
  route = '/';

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.sub = this.authService.isAuth.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    })

  }


  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
