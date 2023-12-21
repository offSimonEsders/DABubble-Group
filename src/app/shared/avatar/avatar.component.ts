import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { onSnapshot } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { Account } from '../../models/account.class';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit, OnDestroy {
  private accountService!: AccountService;
  private firestore!: FirestoreService;
  @Input() accountId!: string;
  @Input() hideStatus!: boolean; // hides or displays the onlineStatus
  account!: Account;
  statusSnap!: Function;

  constructor() {
    this.accountService = inject(AccountService);
    this.firestore = inject(FirestoreService);
  }

  /**
   * The ngOnInit function retrieves an account from the account service and updates the online status of
   * the account based on changes in the Firestore document.
   */
  ngOnInit(): void {
    this.accountService.getAccount(this.accountId).then((account) => {
      this.account = account;
    });
    this.statusSnap = onSnapshot(
      this.firestore.getDocRef('accounts', this.accountId),
      (doc) => {
        this.account.onlineStatus = doc.get('onlineStatus');
      }
    );
  }

  ngOnDestroy(): void {
    this.statusSnap();
    this.accountService.ngOnDestroy();
  }

  /* The function determines the color to be used for the online status indicator in the avatar component. */
  getStatusColor() {
    if (this.account.onlineStatus === 'online') {
      return '#92c83e';
    } else {
      return '#686868';
    }
  }
}
