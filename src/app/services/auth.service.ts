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

  setIsLogged(test: boolean) {
    this.isLogged = test;
    this.isLoggedObservable.next(this.isLogged);
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  createAccountWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then( result => {
      console.log(result)
    })
  }

  signInWithMailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then( result => {
      console.log(result)
    })
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
        this.setIsLogged(true);
        
        localStorage.setItem('user', JSON.stringify({user: {
          name: result.user.displayName,
          email: result.user.email,
          phone: result.user.phoneNumber,
          picture: result.user.photoURL
        }}))
        let user = JSON.parse(localStorage.getItem('user')).user;
        this.userService.setCurrentUser(user);
        this.router.navigate(['home'])
      }
    }).catch(error => {
      console.log(error);
    })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.setIsLogged(false);
      this.userService.getUser(null);
      this.router.navigate(['login']);
    })
  }


}
