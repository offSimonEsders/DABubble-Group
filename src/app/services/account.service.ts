import { Injectable, inject } from '@angular/core';
import {
  doc,
  setDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  getDoc,
} from '@angular/fire/firestore';

import { Account } from '../models/account.class';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  firestore = inject(FirestoreService);
  accSnap!: Function;
  accounts!: Array<DocumentData>;
  account!: DocumentData | undefined;

  constructor() {
    this.accSnap = onSnapshot(
      this.firestore.getCollectionRef('accounts'),
      (data) => {
        this.getAllAccounts(data);
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

  async getAccount(collId: string, docId: string) {
    const docSnap = await getDoc(this.firestore.getDocRef(collId, docId));
    this.account = docSnap.data();
  }

  getAllAccounts(data: QuerySnapshot<DocumentData, DocumentData>) {
    this.accounts = [];
    data.forEach((doc) => {
      this.accounts.push(doc.data());
    });
  }
}
