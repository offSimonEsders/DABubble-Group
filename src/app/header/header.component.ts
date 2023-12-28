import { Component, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.class';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent],
})
export class HeaderComponent implements OnInit {
  authService!: AuthService;
  accountService!: AccountService;
  account!: Account;
  accountStatus!: string;
  accountName!: string;

  constructor() {
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.accountService.getAccount(this.authService.userId).then((account) => {
      this.account = account;
    });
  }
}
