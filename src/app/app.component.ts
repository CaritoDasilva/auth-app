import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auth-app';
  isLogin: boolean;
  user: User;
  constructor( private authService: AuthService, private userService: UsersService, private router: Router) {
    this.isLogin = false;
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;
  }

  ngOnInit(): void {
    this.isUserInLogin()
    this.getUser();
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(data => {
      console.log(data);
      (data === null) ? this.router.navigate(['login']) : this.user = data;
    })
  }

  isUserInLogin() {
    this.authService.getIsLogged().subscribe(data => {
      this.isLogin = data;
    })
  }

  signOut() {
    this.authService.signOut();
  }
}
