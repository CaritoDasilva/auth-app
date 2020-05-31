import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User;
  userObservable: BehaviorSubject<User>;
  constructor( private firestore: AngularFirestore, private http: HttpClient ) {
    this.user = null;
    this.userObservable = new BehaviorSubject<User>(this.user);
   
  }

  public createUser(displayName: string, email: string, phoneNumber: any, photoURL: string, providerId: string, uid: string) {
    return this.firestore.collection('users').add(
      {
        displayName: displayName,
        email: email,
        phoneNumber: phoneNumber,
        photoURL: photoURL,
        providerId: providerId,
        uid: uid
      }
    )
  }

  public getUser(documentId) {
    return this.firestore.collection('users', ref => ref.where('uid', '==', documentId)).snapshotChanges();
  }

  public getRandomUsers() {
    return this.http.get('https://randomuser.me/api/?results=20');
  }
  public getCurrentUser() {
    return this.userObservable.asObservable()
  }

  public setCurrentUser(user: User) {
    this.user = user;
    this.userObservable.next(this.user)
  }

}
