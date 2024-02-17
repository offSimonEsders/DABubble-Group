import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { ReactionService } from '../../../services/reaction.service';
import { MessageService } from '../../../services/message.service';
import { ToggleContainerService } from '../../../services/toggle-container.service';

@Component({
  selector: 'app-reaction-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reaction-bar.component.html',
  styleUrl: './reaction-bar.component.scss',
})
export class ReactionBarComponent {
  firestoreService: FirestoreService;
  authService!: AuthService;
  reactionService!: ReactionService;
  messageService!: MessageService;
  toggleContainerService!: ToggleContainerService;
  @Input() message!: any; // Message or Answer
  @Input() collection!: string;
  @Input() ownMessage!: boolean;
  @Input() hideIcons!: boolean;
  @Output() reactionbarEmitter = new EventEmitter<string>();
  editMessage = false;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
    this.reactionService = inject(ReactionService);
    this.messageService = inject(MessageService);
    this.toggleContainerService = inject(ToggleContainerService);
  }

  showEditMessageBtn() {
    this.editMessage = !this.editMessage;
  }

  openEditMessageBox() {
    this.reactionbarEmitter.emit('editMessageBox');
    this.showEditMessageBtn();
  }

  openEmojibar() {
    this.reactionbarEmitter.emit('emojibar');
  }

  addReaction(reaction: string) {
    this.reactionService.addReaction(reaction, this.message, this.collection);
  }

  openSecondaryChat() {
    this.messageService.messageId = this.message.id;
    this.toggleContainerService.toggleContainer({
      element: 'secondary-chat',
      width: '100%',
      message: this.message,
    });
    this.toggleContainerService.displaySecondaryChat = true;
  }
}
