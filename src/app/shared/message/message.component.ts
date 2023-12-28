import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { BubbleStyle } from './message-bubble-style.directive';
import { Message } from '../../models/message.class';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.class';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [AvatarComponent, CommonModule, BubbleStyle],
})
export class MessageComponent implements OnInit {
  authService!: AuthService;
  accountService!: AccountService;
  @Input() emitMessage!: Message;
  account!: Account;
  dispatchedTime!: Date;
  lastAnswer!: Date;
  ownMessage!: boolean;
  onhover = false;
  editMessage = false;
  openedEditMessage = false;

  constructor() {
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
    if (this.emitMessage.messageFrom === this.authService.userId) {
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

  showEditMessageBtn() {
    this.editMessage = !this.editMessage;
  }

  openEditMessageBox() {
    this.openedEditMessage = true;
    this.showEditMessageBtn();
  }

  cancelEditMessage() {
    this.openedEditMessage = false;
  }

  saveEditedMessage() {
    this.openedEditMessage = false;
  }
}
