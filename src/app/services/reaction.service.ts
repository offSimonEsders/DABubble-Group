import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { Message } from '../models/message.class';
import { arrayUnion, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ReactionService {
  firestoreService!: FirestoreService;
  authService!: AuthService;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
  }

  addReaction(reaction: string, message: Message, collection: string) {
    if (this.reactionExists(reaction, message)) {
      let index = message.reactions
        .map((reaction) => reaction.reaction)
        .indexOf(reaction);
      if (!this.userReacted(index, message)) {
        this.updateReaction(index, message, collection);
      }
    } else {
      this.addNewReaction(reaction, message, collection);
    }
  }

  userReacted(index: number, message: Message) {
    return message.reactions[index].reacting.includes(
      this.authService.userName
    );
  }

  reactionExists(reaction: string, message: Message) {
    return message.reactions
      .map((reaction) => reaction.reaction)
      .includes(reaction);
  }

  async updateReaction(index: number, message: Message, collection: string) {
    let newReactions = message.reactions;
    newReactions[index].reacting.push(this.authService.userName);
    await updateDoc(
      this.firestoreService.getMessageDocRef(
        collection,
        message.chatId,
        message.id
      ),
      { reactions: newReactions }
    );
  }

  async addNewReaction(reaction: string, message: Message, collection: string) {
    await updateDoc(
      this.firestoreService.getMessageDocRef(
        collection,
        message.chatId,
        message.id
      ),
      {
        reactions: arrayUnion({
          reacting: [this.authService.userName],
          reaction: reaction,
        }),
      }
    );
  }
}
