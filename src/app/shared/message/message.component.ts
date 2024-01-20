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
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.class';
import { AccountService } from '../../services/account.service';
import { ReactionComponent } from './reaction/reaction.component';
import { FirestoreService } from '../../services/firestore.service';
import { ReactionBarComponent } from './reaction-bar/reaction-bar.component';
import { EmojiBarComponent } from './emoji-bar/emoji-bar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { updateDoc } from '@angular/fire/firestore';
import { TimePipe } from './time.pipe';
import { ToggleContainerService } from '../../services/toggle-container.service';
import { MessageService } from '../../services/message.service';
import { ResizeTextareaDirective } from './resize-textarea.directive';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [
    AvatarComponent,
    CommonModule,
    BubbleStyle,
    ResizeTextareaDirective,
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
  toggleContainerService!: ToggleContainerService;
  messageService!: MessageService;
  @Input() emitMessage!: any; // Message or Answer
  @Input() collection!: string;
  @Input() hideAnswers!: boolean;
  @Input() isAnswer!: boolean;
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
    this.toggleContainerService = inject(ToggleContainerService);
    this.messageService = inject(MessageService);
  }

  ngOnInit(): void {
    if (this.emitMessage) {
      this.checkIfOwnMessage();
      this.getAccount();
      this.dispatchedTime = new Date(this.emitMessage.dispatchedDate);
      this.lastAnswer = new Date(this.emitMessage.lastAnswer);
    }
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
    if (this.emitMessage.isAnAnswer) {
      this.editAnswer().then(() => {
        this.editMessageForm.reset();
        this.cancelEditMessage();
      });
    } else {
      this.editMessage().then(() => {
        this.editMessageForm.reset();
        this.cancelEditMessage();
      });
    }
  }

  async editAnswer() {
    return await updateDoc(
      this.firestoreService.getAnswerDocRef(
        this.emitMessage.chatId,
        this.emitMessage.messageId,
        this.emitMessage.id
      ),
      {
        message: this.editMessageForm.value.message,
      }
    );
  }

  async editMessage() {
    return await updateDoc(
      this.firestoreService.getMessageDocRef(
        this.collection,
        this.emitMessage.chatId,
        this.emitMessage.id
      ),
      {
        message: this.editMessageForm.value.message,
      }
    );
  }

  openSecondaryChat() {
    this.messageService.messageId = this.emitMessage.id;
    this.toggleContainerService.toggleContainer({
      element: 'secondary-chat',
      width: '100%',
      message: this.emitMessage,
    });
    this.toggleContainerService.displaySecondaryChat = true;
  }

  @HostListener('mouseenter') mouseover() {
    this.onhover = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.onhover = false;
  }

  setInlinePaddingToContainer() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (this.isAnswer) {
      return '0px';
    } else if (this.ownMessage) {
      if(screenWidth < 1000){
        return '0px 0px'
      }else{
        return '100px 0px';
      }
    } else {
      if(screenWidth < 1000){
        return '0px 0px'
      }else{
        return '0px 1000px';
      }
      
    }
  }
}
