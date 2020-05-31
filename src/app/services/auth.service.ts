import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import 'firebase/auth';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth, private userService: UsersService, private router: Router ) { }

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
      this.router.navigate(['home'])
    }).catch(error => {
      console.log(error);
    })
  }
}
