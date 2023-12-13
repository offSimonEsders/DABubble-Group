import { Injectable } from '@angular/core';
import { Account } from '../models/accounts.class';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accounts!: Array<Account>;

  addAccount(account: Account) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts.slice(); // Gibt Kopie des Account Arrays zurück
  }

  getAccount(index: number) {
    return this.accounts[index];
  }

  updateAccount(index: number, account: Account) {
    this.accounts[index] = account;
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
  }
}
