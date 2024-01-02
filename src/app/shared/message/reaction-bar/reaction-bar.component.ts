import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { Message } from '../../../models/message.class';
import { AuthService } from '../../../services/auth.service';
import { ReactionService } from '../../../services/reaction.service';

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
  @Input() message!: Message;
  @Input() collection!: string;
  @Input() ownMessage!: boolean;
  @Output() reactionbarEmitter = new EventEmitter<string>();
  editMessage = false;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
    this.reactionService = inject(ReactionService);
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
}
