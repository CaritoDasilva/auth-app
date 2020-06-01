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
  isRegisterMode: boolean;
  constructor( private authService: AuthService, private router: Router ) {
    this.isLogged = localStorage.getItem('user') ? true : false;
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl('')
    })
    this.hide = true;
    this.isRegisterMode = false;
  }

  ngOnInit(): void {
    this.isLogged && this.router.navigate(['/home']);
  }

  loginwithGoogle() {
    this.authService.googleAuth();
  }

  registerWithMail() {
    console.log(this.loginForm.value)
    this.authService.createAccountWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password, this.loginForm.value.name);
    this.loginForm.setValue({
      name: '',
      email: '',
      password: ''
    });
    this.isRegisterMode = false;
    
  }

  signInWithMail() {
    this.authService.signInWithMailAndPassword(this.loginForm.value.email,this.loginForm.value.password).then(response => {
      console.log(response);
    }).catch( error => console.log(error));
  }

  changeMode() {
    this.isRegisterMode = true;
  }

}
