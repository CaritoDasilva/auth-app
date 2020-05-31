import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  constructor( private authService: AuthService, private router: Router ) {
    this.isLogged = localStorage.getItem('user') ? true : false;
  }

  ngOnInit(): void {
    this.isLogged && this.router.navigate(['/home']);
  }

  loginwithGoogle() {
    this.authService.googleAuth();
  }

}
