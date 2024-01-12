import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
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
export class AccountService implements OnDestroy{
  firestore: FirestoreService;
  accSnap!: Function;
  accounts: Account[] = [];

  constructor() {
    this.firestore = inject(FirestoreService);
    this.accSnap = this.getAllAccounts();
  }

  sortAccounts(){
    console.log(this.accounts)
  }

  ngOnDestroy() {
    this.accSnap();
  }

  /**
   * The addAccount function asynchronously adds an account to a Firestore database.
   * @param {Account} account - Object of type `Account`.
   */
  async addAccount(account: Account) {
    await setDoc(
      doc(this.firestore.db, 'accounts', account.accountId),
      account.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  /**
   * The function retrieves an account document from Firestore and creates an account object from the document snapshot.
   * @param {string} docId - Id of the document in the "accounts" collection that you want to retrieve.
   * @returns Returning an account object.
   */
  async getAccount(docId: string) {
    const docSnap = await getDoc(this.firestore.getDocRef('accounts', docId));
    let account = this.createAccount(docSnap);
    return account;
    
  }

  /**
   * The function retrieves all accounts from a Firestore collection and updates the local accounts array.
   * @returns Returning a snapshot listener.
   */
  getAllAccounts() {
    return onSnapshot(this.firestore.getCollectionRef('accounts'), (list) => {
      this.accounts = [];
      list.forEach((element: QueryDocumentSnapshot) => {
        let account = this.createAccount(element);
        this.accounts.push(account);

      });
    });
  }

  /* The function that takes in a `QueryDocumentSnapshot` or `DocumentSnapshot` object and creates a new `Account` object using the data from the snapshot. */
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
