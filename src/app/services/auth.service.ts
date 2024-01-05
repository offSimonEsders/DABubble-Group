import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';
import {
  Auth,
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyPasswordResetCode,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../models/account.class';
import { FirestoreService } from './firestore.service';
import { updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accountService!: AccountService;
  private firestoreService!: FirestoreService;
  user!: Account;
  provider: GoogleAuthProvider;
  profileViewAccount!: Account;

  constructor(private auth: Auth, private router: Router) {
    this.accountService = inject(AccountService);
    this.firestoreService = inject(FirestoreService);
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  authServiceSignUpWithEmailAndPassword(
    user_email: string,
    user_password: string
  ): any {
    return createUserWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        return userCredential.user.uid;
      })
      .catch((error) => {
        console.log('die registrierung ist fehlgeschlagen');
        return;
      });
  }
  

  async authServiceSignInWithEmailAndPassword(
    user_email: string,
    user_password: string,
    error_function?: Function
  ) {
    await signInWithEmailAndPassword(this.auth, user_email, user_password)
      .then((userCredential) => {
        this.getUser(userCredential.user.uid);
        this.setOnlineStatus(userCredential.user.uid);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        if (error_function) {
          error_function();
        }
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
      this.getUser('pesOSpHsgAt97WwG705y');
      this.setOnlineStatus('pesOSpHsgAt97WwG705y');
      this.router.navigate(['/home']);
    });
  }

  async authServiceLogOut() {
    await updateDoc(
      this.firestoreService.getDocRef('accounts', this.user.accountId),
      { onlineStatus: 'offline' }
    ).then(() => {
      signOut(this.auth);
      this.router.navigate(['']);
    });
  }

  async authUpdateUser(user:Account){
    await updateDoc(
      this.firestoreService.getDocRef('accounts', user.accountId),
      { 
        name: user.name,
        email: user.email,
      }
    ).then(() => {
      signOut(this.auth);
      this.router.navigate(['']);
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

  getUser(id: string) {
    this.accountService.getAccount(id).then((account) => {
      this.user = account;
    });
  }

  setOnlineStatus(accId: string) {
    return updateDoc(this.firestoreService.getDocRef('accounts', accId), {
      onlineStatus: 'online',
    });
  }

  async resetPasswordMail(email: string) {
    return await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async changePassword(oobCode: string, newPassword: string) {
    console.log(oobCode);
    return await confirmPasswordReset(this.auth, oobCode, newPassword);
  }

  async verifyooBCode(oobCode: string) {
    return verifyPasswordResetCode(this.auth, oobCode)
      .then(() => {
        return false;
      })
      .catch(() => {
        return true;
      });
  }
}
