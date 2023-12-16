import { Injectable, inject } from '@angular/core';
import {
  doc,
  setDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from '@angular/fire/firestore';

import { Account } from '../models/accounts.class';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  firestore = inject(FirestoreService);
  accSnap!: Function;
  accounts!: Array<Account>;

  constructor() {
    this.accSnap = onSnapshot(
      this.firestore.getCollectionRef('accounts'),
      (data) => {
        this.accounts = [];
        this.getAccounts(data);
      }
    );
  }

  async addAccount(account: Account) {
    await setDoc(
      doc(this.firestore.db, 'accounts', account.accountId),
      account.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  getAccounts(data: QuerySnapshot<DocumentData, DocumentData>) {
    data.forEach((acc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      this.accounts.push(
        new Account(
          acc.get('name'),
          acc.get('email'),
          acc.get('photoUrl'),
          acc.get('onlineStatus'),
          acc.get('id'),
          acc.get('chatIds')
        )
      );
    });
  }
}
