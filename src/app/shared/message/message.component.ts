import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { BubbleStyle } from './message-bubble-style.directive';
import { Message } from '../../models/message.class';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.class';
import { AccountService } from '../../services/account.service';
import { ReactionComponent } from './reaction/reaction.component';
import { FirestoreService } from '../../services/firestore.service';
import { ReactionBarComponent } from './reaction-bar/reaction-bar.component';
import { EmojiBarComponent } from '../emoji-bar/emoji-bar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { updateDoc } from '@angular/fire/firestore';
import { TimePipe } from './time.pipe';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [
    AvatarComponent,
    CommonModule,
    BubbleStyle,
    ReactionComponent,
    ReactionBarComponent,
    EmojiBarComponent,
    FormsModule,
    TimePipe,
  ],
})
export class MessageComponent implements OnInit {
  firestoreService!: FirestoreService;
  authService!: AuthService;
  accountService!: AccountService;
  @Input() emitMessage!: Message;
  @Input() collection!: string;
  @ViewChild('form') editMessageForm!: NgForm;
  account!: Account;
  dispatchedTime!: Date;
  lastAnswer!: Date;
  ownMessage!: boolean;
  onhover = false;
  openedEditMessage = false;
  openedEmojibar = false;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.checkIfOwnMessage();
    this.getAccount();
    this.dispatchedTime = new Date(this.emitMessage.dispatchedDate);
    this.lastAnswer = new Date(this.emitMessage.lastAnswer);
  }

  checkIfOwnMessage() {
    if (this.emitMessage.messageFrom === this.authService.user.accountId) {
      this.ownMessage = true;
    } else {
      this.ownMessage = false;
    }
  }

  getAccount() {
    this.accountService
      .getAccount(this.emitMessage.messageFrom)
      .then((account) => {
        this.account = account;
      });
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.onhover = true;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.onhover = false;
  }

  displayElement(element: string) {
    if (element === 'editMessageBox') {
      this.openedEditMessage = true;
      setTimeout(() => {
        this.editMessageForm.setValue({ message: this.emitMessage.message });
      }, 100);
    } else {
      this.openedEmojibar = true;
    }
  }

  closeEmojibar() {
    this.openedEmojibar = false;
  }

  cancelEditMessage() {
    this.openedEditMessage = false;
  }

  async saveEditedMessage() {
    await updateDoc(
      this.firestoreService.getMessageDocRef(
        this.collection,
        this.emitMessage.chatId,
        this.emitMessage.id
      ),
      {
        message: this.editMessageForm.value.message,
      }
    ).then(() => {
      this.editMessageForm.reset();
      this.cancelEditMessage();
    });
  }
}
