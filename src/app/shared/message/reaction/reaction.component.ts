import { Component, HostListener, Input, inject } from '@angular/core';
import { Reaction } from '../../../models/reaction.class';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Message } from '../../../models/message.class';
import { FirestoreService } from '../../../services/firestore.service';
import { updateDoc } from '@angular/fire/firestore';
import { ReactionService } from '../../../services/reaction.service';

@Component({
  selector: 'app-reaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reaction.component.html',
  styleUrl: './reaction.component.scss',
})
export class ReactionComponent {
  firestoreService!: FirestoreService;
  authService!: AuthService;
  reactionService!: ReactionService;
  @Input() collection!: string;
  @Input() message!: Message;
  @Input() index!: number;
  @Input() reaction!: Reaction;
  onhover = false;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
    this.reactionService = inject(ReactionService);
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.onhover = true;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.onhover = false;
  }

  updateMessageReaction(index: number) {
    let newReactions = this.message.reactions;
    if (this.reactionService.userReacted(index, this.message)) {
      this.removeReaction(index, newReactions);
    } else {
      this.reactionService.updateReaction(index, this.message, this.collection);
    }
  }

  removeReaction(index: number, newReactions: Reaction[]) {
    let indexToDelete = this.message.reactions[index].reacting.indexOf(
      this.authService.user.name
    );
    newReactions[index].reacting.splice(indexToDelete, 1);
    if (newReactions[index].reacting.length > 0) {
      this.updateReaction(newReactions);
    } else {
      this.deleteReaction(index, newReactions);
    }
  }

  deleteReaction(index: number, newReactions: Reaction[]) {
    newReactions.splice(index, 1);
    this.updateReaction(newReactions);
  }

  async updateReaction(newReactions: Reaction[]) {
    await updateDoc(
      this.firestoreService.getMessageDocRef(
        this.collection,
        this.message.chatId,
        this.message.id
      ),
      { reactions: newReactions }
    );
  }
}
