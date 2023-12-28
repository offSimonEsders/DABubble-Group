import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../models/account.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accountService!: AccountService;
  userId = 'pesOSpHsgAt97WwG705y';

  provider: GoogleAuthProvider;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.accountService = inject(AccountService);
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  authServiceSignUpWithEmailAndPassword(
    user_name: string,
    user_email: string,
    user_password: string,
    photoUrl: any
  ) {
    createUserWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        this.authServiceCreateNewAccount(
          user_name,
          user_email,
          'test',
          userCredential
        );
      })
      .catch((error) => {
        console.log('die registrierung ist fehlgeschlagen');
      });
  }

  authServiceSignInWithEmailAndPassword(
    user_email: string,
    user_password: string
  ) {
    signInWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        this.router.navigate(['/test']);
      })
      .catch((error) => {
        console.log('der login ist fehlgeschlagen');
      });
  }

  authServiceSignInWithGoogle() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  signInAnonymously() {
    signInAnonymously(this.auth).then(() => {
      this.router.navigate(['/test']);
    });
  }

  authServiceSignOut() {
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser);
    });
  }

  authServiceCreateNewAccount(
    user_name: string,
    user_email: string,
    photoUrl: any,
    userCredential: UserCredential
  ) {
    const newAcc = new Account(
      user_name,
      user_email,
      photoUrl,
      'online',
      userCredential.user.uid
    );
    this.accountService.addAccount(newAcc);
  }

  // Sign up, login, auto-login, logout, auto-logout, forgot-password functions
}
