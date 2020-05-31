import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  loginForm: FormGroup;
  hide: boolean;
  constructor( private authService: AuthService, private router: Router ) {
    this.isLogged = localStorage.getItem('user') ? true : false;
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl('')
    })
    this.hide = true;
  }

  ngOnInit(): void {
    this.isLogged && this.router.navigate(['/home']);
  }

  loginwithGoogle() {
    this.authService.googleAuth();
  }

  signInWithMail() {
    console.log(this.loginForm.value)
    this.authService.createAccountWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)
  }

}
