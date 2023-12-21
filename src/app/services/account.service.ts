import { Injectable, inject } from '@angular/core';
import {
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from '@angular/fire/firestore';

import { Account } from '../models/account.class';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  firestore = inject(FirestoreService);
  accSnap!: Function;
  accounts: Account[] = [];

  constructor() {
    this.accSnap = this.getAllAccounts();
  }

  ngOnDestroy() {
    this.accSnap();
  }

  async addAccount(account: Account) {
    await setDoc(
      doc(this.firestore.db, 'accounts', account.accountId),
      account.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  async getAccount(docId: string) {
    const docSnap = await getDoc(this.firestore.getDocRef('accounts', docId));
    let account = this.createAccount(docSnap);
    return account;
  }

  getAllAccounts() {
    return onSnapshot(this.firestore.getCollectionRef('accounts'), (list) => {
      this.accounts = [];
      list.forEach((element: QueryDocumentSnapshot) => {
        let account = this.createAccount(element);
        this.accounts.push(account);
      });
    });
  }

  createAccount(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Account(
      data.get('name'),
      data.get('email'),
      data.get('photoUrl'),
      data.get('onlineStatus'),
      data.get('id')
    );
  }
}
