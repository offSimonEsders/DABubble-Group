import { Injectable, inject } from '@angular/core';
import { Message } from '../models/message.class';
import { FirestoreService } from './firestore.service';
import { ChatService } from './chat.service';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  getDoc,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class MessageService {
  firestore!: FirestoreService;
  chatService!: ChatService;
  messageSnap!: Function;
  messages!: Array<Message>;
  collId!: string;
  channelId!: string;

  constructor() {
    this.firestore = inject(FirestoreService);
    this.chatService = inject(ChatService);
    this.messageSnap = this.setChats();
  }

  async getMessage(docId: string) {
    const docSnap: DocumentSnapshot = await getDoc(
      this.firestore.getMessageDocRef(this.collId, this.channelId, docId)
    );
    const message = this.createMessage(docSnap);
    return message;
  }

  setChats() {
    return onSnapshot(
      this.firestore.getMessageCollRef(this.collId, this.channelId),
      (list: QuerySnapshot) => {
        this.messages = [];
        list.forEach((element: QueryDocumentSnapshot) => {
          const message = this.createMessage(element);
          this.messages.push(message);
        });
      }
    );
  }

  createMessage(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Message(
      data.get('id'),
      data.get('chatId'),
      data.get('messageFrom'),
      data.get('dispachedDate'),
      data.get('message'),
      data.get('reactions')
    );
  }
}
