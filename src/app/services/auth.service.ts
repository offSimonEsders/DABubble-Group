import { Injectable, inject } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  accountService!: AccountService;

  constructor() {
    this.accountService = inject(AccountService);
  }
  // Sign up, login, auto-login, logout, auto-logout, forgot-password functions
}
