import { Injectable, inject } from '@angular/core';
import { Message } from '../models/message.class';
import { FirestoreService } from './firestore.service';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  firestore!: FirestoreService;
  messages!: Array<Message>;
  dispatchedDays!: Array<number>;
  filteredMessages!: Array<Message[]>;
  collId!: string;
  channelId!: string;
  openChatEmitter = new Subject<{ collId: string }>();

  constructor() {
    this.firestore = inject(FirestoreService);
  }

  checkForExistingMessages(collId: string, channelId: string) {
    this.collId = collId;
    this.channelId = channelId;
    this.setMessages();
  }

  async addMessage(message: Message, collId: string, channelId: string) {
    return await addDoc(
      collection(this.firestore.db, collId, channelId, 'messages'),
      message.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  async getMessage(docId: string) {
    const docSnap: DocumentSnapshot = await getDoc(
      this.firestore.getMessageDocRef(this.collId, this.channelId, docId)
    );
    const message = this.createMessage(docSnap);
    return message;
  }

  setMessages() {
    return onSnapshot(
      this.firestore.getMessageCollRef(this.collId, this.channelId),
      (list: QuerySnapshot) => {
        this.messages = [];
        list.forEach((element: QueryDocumentSnapshot) => {
          const message = this.createMessage(element);
          this.messages.push(message);
        });
        this.getDispatchedDays();
        this.getFilteredMessages();
      }
    );
  }

  createMessage(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Message(
      data.get('id'),
      data.get('chatId'),
      data.get('messageFrom'),
      data.get('dispatchedDate'),
      data.get('message'),
      data.get('reactions'),
      data.get('answerAmount'),
      data.get('lastAnswer')
    );
  }

  getDispatchedDays() {
    let timestamps = this.messages.map((message) => message.dispatchedDate);
    for (let i = 0; i < timestamps.length; i++) {
      let dispatchedDay = new Date(timestamps[i]);
      dispatchedDay.setHours(0, 0, 0, 0);
      timestamps[i] = +dispatchedDay;
    }
    this.dispatchedDays = Array.from(new Set(timestamps)).sort();
  }

  getFilteredMessages() {
    this.filteredMessages = [];
    for (let i = 0; i < this.dispatchedDays.length; i++) {
      let arrayOfFilteredMessages = this.messages.filter((message: Message) =>
        this.onDispatchedDay(message, i)
      );
      this.filteredMessages.push(arrayOfFilteredMessages);
    }
  }

  onDispatchedDay(message: Message, index: number) {
    return (
      message.dispatchedDate >= this.dispatchedDays[index] &&
      message.dispatchedDate < this.dispatchedDays[index] + 86400000 // Zahl ist ein Tag in Millisekunden (1000 * 60 * 60 * 24)
    );
  }
}
