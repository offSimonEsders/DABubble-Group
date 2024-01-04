import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { Message } from '../models/message.class';
import { arrayUnion, updateDoc } from '@angular/fire/firestore';
import { Answer } from '../models/answer.class';
import { Reaction } from '../models/reaction.class';

@Injectable({ providedIn: 'root' })
export class ReactionService {
  firestoreService!: FirestoreService;
  authService!: AuthService;

  constructor() {
    this.firestoreService = inject(FirestoreService);
    this.authService = inject(AuthService);
  }

  addReaction(reaction: string, message: Message | Answer, collection: string) {
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

  userReacted(index: number, message: Message | Answer) {
    return message.reactions[index].reacting.includes(
      this.authService.user.name
    );
  }

  reactionExists(reaction: string, message: Message | Answer) {
    return message.reactions
      .map((reaction) => reaction.reaction)
      .includes(reaction);
  }

  async updateReaction(index: number, message: any, collection: string) {
    let newReactions = message.reactions;
    newReactions[index].reacting.push(this.authService.user.name);
    if (message.isAnAnswer) {
      this.updateAnswerReaction(message, newReactions);
    } else {
      this.updateMessageReaction(collection, message, newReactions);
    }
  }

  async updateAnswerReaction(message: Answer, newReactions: Reaction[]) {
    return await updateDoc(
      this.firestoreService.getAnswerDocRef(
        message.chatId,
        message.messageId,
        message.id
      ),
      { reactions: newReactions }
    );
  }

  async updateMessageReaction(
    collection: string,
    message: Message,
    newReactions: Reaction[]
  ) {
    return await updateDoc(
      this.firestoreService.getMessageDocRef(
        collection,
        message.chatId,
        message.id
      ),
      { reactions: newReactions }
    );
  }

  async addNewReaction(reaction: string, message: any, collection: string) {
    if (message.isAnAnswer) {
      this.addNewAnswerReaction(reaction, message);
    } else {
      this.addNewMessageReaction(reaction, message, collection);
    }
  }

  async addNewAnswerReaction(reaction: string, message: Answer) {
    await updateDoc(
      this.firestoreService.getAnswerDocRef(
        message.chatId,
        message.messageId,
        message.id
      ),
      {
        reactions: arrayUnion({
          reacting: [this.authService.user.name],
          reaction: reaction,
        }),
      }
    );
  }

  async addNewMessageReaction(
    reaction: string,
    message: Message,
    collection: string
  ) {
    await updateDoc(
      this.firestoreService.getMessageDocRef(
        collection,
        message.chatId,
        message.id
      ),
      {
        reactions: arrayUnion({
          reacting: [this.authService.user.name],
          reaction: reaction,
        }),
      }
    );
  }
}
