import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import 'firebase/auth';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean;
  isLoggedObservable: BehaviorSubject<boolean>;
  constructor( public afAuth: AngularFireAuth, private userService: UsersService, private router: Router ) { 
    this.isLogged = localStorage.getItem('user') ? true : false;
    this.isLoggedObservable = new BehaviorSubject<boolean>(this.isLogged)
  }

  getIsLogged(){
    return this.isLoggedObservable.asObservable();
  }

  setTestingMode(test: boolean) {
    this.isLogged = test;
    this.isLoggedObservable.next(this.isLogged);
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    this.afAuth.signInWithPopup(provider).then(result => {
      console.log(result)
      this.userService.getUser(result.user.uid).subscribe(data=>{
        data.length === 0 ? this.userService.createUser(result.user.displayName, result.user.email, 
         result.user.phoneNumber, result.user.photoURL, result.user.providerId, 
         result.user.uid) : data.forEach(user => user.payload.doc.data())
      });
      if(!this.isLogged) {
        this.setTestingMode(true);
        localStorage.setItem('user', JSON.stringify({user: {
          name: result.user.displayName,
          email: result.user.email,
          phone: result.user.phoneNumber,
          picture: result.user.photoURL
        }}))
        this.router.navigate(['home'])
      }
    }).catch(error => {
      console.log(error);
    })
  }
}
