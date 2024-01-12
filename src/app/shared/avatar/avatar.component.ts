import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { onSnapshot } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { Account } from '../../models/account.class';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit, OnChanges, OnDestroy {
  private accountService!: AccountService;
  private authService!: AuthService;
  private firestore!: FirestoreService;
  private chatService!: ChatService;
  @Input() accountId!: string;
  @Input() hideStatus!: boolean; // hides or displays the onlineStatus
  account!: Account;
  statusSnap!: Function;
  openChatSub!: Subscription;
  imageurl!: string;
  accSnap!: any;

  constructor(public storageservcice: StorageService) {
    this.accountService = inject(AccountService);
    this.firestore = inject(FirestoreService);
    this.chatService = inject(ChatService);
    this.authService = inject(AuthService);
  }

  /**
   * The ngOnInit function initializes the component by setting the account, updating the online status,
   * and updating the account ID.
   */
  async ngOnInit() {
    this.setAccount();
    this.updateOnlineStatus();
    this.updateAccountId();
    this.accSnap = onSnapshot(
      this.firestore.getCollectionRef('accounts'),
      () => {
        this.setAccount();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setAccount();
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
    // this.statusSnap();
    // this.accountService.ngOnDestroy();
  }

  /**
   * The function subscribes to the openChatEmitter and updates the `accountId` property
   * if the emitted data contains an `accountId` value.
   */
  updateAccountId() {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        if (data.accountId) {
          this.accountId = data.accountId;
        }
      },
    });
  }

  /**
   * The function retrieves an account using the account ID and assigns it to the "account" property.
   */
  setAccount() {
    this.accountService.getAccount(this.accountId).then((account) => {
      this.account = account;
      this.setImageUrl(account);
    });
  }

  /**
   * The function updates the online status of an account by listening for changes in the onlineStatus field of a document in Firestore.
   */
  updateOnlineStatus() {
    if (this.account) {
      this.statusSnap = onSnapshot(
        this.firestore.getDocRef('accounts', this.accountId),
        (doc) => {
          this.account.onlineStatus = doc.get('onlineStatus');
        }
      );
    }
  }

  /* The function determines the color to be used for the online status indicator in the avatar component. */
  getStatusColor() {
    if (this.account.onlineStatus === 'online') {
      return '#92c83e';
    } else {
      return '#686868';
    }
  }

  async setImageUrl(account: Account) {
    this.imageurl = await this.storageservcice.getImageUrl(account.photoUrl);
  }
}
