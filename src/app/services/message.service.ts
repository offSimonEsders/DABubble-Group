import { Injectable, inject } from '@angular/core';
import { Message } from '../models/message.class';
import { FirestoreService } from './firestore.service';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Answer } from '../models/answer.class';
import { Channel } from '../models/channel.class';

@Injectable({ providedIn: 'root' })
export class MessageService {
  firestore!: FirestoreService;
  messages!: Array<Message>;
  answers!: Array<Answer>;
  dispatchedDays!: Array<number>;
  filteredMessages!: Array<Message[]>;
  collId!: string;
  channelId!: string;
  messageId!: string;
  loadedMessagesEmitter = new Subject<boolean>();
  loadedAnswersEmitter = new Subject<boolean>();
  openChatEmitter = new Subject<{ collId: string }>();

  messageForAnswers!: Message;

  editChannel!:Channel;

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

  async updateAnswerAmount(channelId: string, messageId: string, answerAmount: number) {
    const nachrichtRef = doc(this.firestore.db, 'channels', channelId, 'messages', messageId);
    await updateDoc(nachrichtRef, {
      answerAmount: answerAmount
    });
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
      data.get('lastAnswer'),
      data.get('isAnAnswer')
    );
  }

  async setLastAnswer(chatId: string,messageId: string ) {
    return await updateDoc(
      this.firestore.getMessageDocRef(
        this.collId,
        chatId,
        messageId
      ),
      {
        lastAnswer: Date.now(),
      }
    );
  }
  
  async addAnswer(answer: Answer, chatId: string, messageId: string) {
    this.setLastAnswer(chatId,messageId);
    return await addDoc(
      collection(
        this.firestore.db,
        'channels',
        chatId,
        'messages',
        messageId,
        'answers'
      ),
      answer.toJson()
    ).catch((err) => {
      // show an Errormessage
    });
  }

  setAnswers() {
    return onSnapshot(
      this.firestore.getChannelAnswerCollRef(this.channelId, this.messageId),
      (list: QuerySnapshot) => {
        this.answers = [];
        list.forEach((element: QueryDocumentSnapshot) => {
          const answer = this.createAnswer(element);
          this.answers.push(answer);
        });
        this.answers.sort((a, b) => a.dispatchedDate - b.dispatchedDate);
        this.loadedAnswersEmitter.next(true);
      }
    );
  }

  createAnswer(data: QueryDocumentSnapshot | DocumentSnapshot) {
    return new Answer(
      data.get('id'),
      data.get('chatId'),
      data.get('messageId'),
      data.get('messageFrom'),
      data.get('dispatchedDate'),
      data.get('message'),
      data.get('reactions'),
      data.get('answerAmount'),
      data.get('lastAnswer'),
      data.get('isAnAnswer')
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

  // prettier-ignore
  getFilteredMessages() {
    if(this.dispatchedDays){
      this.filteredMessages = [];
      if(this.dispatchedDays.length > 0){
        for (let i = 0; i < this.dispatchedDays.length; i++) {
          let arrayOfFilteredMessages = this.messages.filter((message: Message) =>
            this.onDispatchedDay(message, i)
          );
          arrayOfFilteredMessages.sort((a, b) => a.dispatchedDate - b.dispatchedDate);
          this.filteredMessages.push(arrayOfFilteredMessages);
        }
        this.loadedMessagesEmitter.next(true);
      }
    }

  }

  onDispatchedDay(message: Message, index: number) {
    return (
      message.dispatchedDate >= this.dispatchedDays[index] &&
      message.dispatchedDate < this.dispatchedDays[index] + 86400000 // Zahl ist ein Tag in Millisekunden (1000 * 60 * 60 * 24)
    );
  }
}
