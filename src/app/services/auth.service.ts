import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../models/account.class';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accountService!: AccountService;
  userId = 'pesOSpHsgAt97WwG705y';

  provider: GoogleAuthProvider;

  constructor(private auth: Auth, private router: Router) {
    this.accountService = inject(AccountService);
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  authServiceSignUpWithEmailAndPassword(
    user_email: string,
    user_password: string
  ): any {
    return createUserWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        return userCredential.user.uid;
      })
      .catch((error) => {
        console.log('die registrierung ist fehlgeschlagen');
        return;
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
    Uid: string
  ) {
    const newAcc = new Account(user_name, user_email, photoUrl, 'online', Uid);
    this.accountService.addAccount(newAcc);
  }

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  // Sign up, login, auto-login, logout, auto-logout, forgot-password functions
}
