import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auth-app';
  isLogin: boolean;
  user: User;
  constructor( private authService: AuthService) {
    this.isLogin = false;
    this.user = null;
  }

  ngOnInit(): void {
    this.isUserInLogin()
    this.getUser();
  }

  getUser() {
    this.user = this.isLogin ? JSON.parse(localStorage.getItem('user')).user : null;
    console.log(this.user.name)
  }

  isUserInLogin() {
    this.authService.getIsLogged().subscribe(data => {
      this.isLogin = data;
    })
  }
}
