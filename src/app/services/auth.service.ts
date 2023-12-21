import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  signUp(user_email: string, user_password: string) {
    createUserWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log("die registrierung ist fehlgeschlagen");
      });
  }

  signIn(user_email: string, user_password: string) {
    signInWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log("der login ist fehlgeschlagen");
      });
  }

  signOut() {
    this.auth.signOut();
  }

  signInWithGoogle() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        console.log(error)
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
    signInAnonymously(this.auth)
      .then((userCredential) => {
        console.log(userCredential);
        this.router.navigate(['/test'])
      })
  }

  // Sign up, login, auto-login, logout, auto-logout, forgot-password functions
}
