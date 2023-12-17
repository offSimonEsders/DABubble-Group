import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

import { Chat } from '../models/chat.class';
import { Channel } from '../models/channel.class';
import { FirestoreService } from './firestore.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  firestore = inject(FirestoreService);
  chatSnap!: Function;

  currentChat: DocumentData | undefined;
  chats!: Array<DocumentData>;
  channelSnap!: Function;
  channels!: Array<DocumentData>;
  openChatEmitter = new Subject<{
    chatColl: string;
    chatId: string;
  }>();

  channelCreatedSource = new Subject<boolean>();
  channelCreated(state: boolean) {
    this.channelCreatedSource.next(state);
  }
  channelCreated$ = this.channelCreatedSource.asObservable();
  constructor() {
    this.chatSnap = this.onSnap('chats');
    this.channelSnap = this.onSnap('channels');
  }

  async addChat(chat: Chat | Channel, collId: string) {
    await addDoc(collection(this.firestore.db, collId), chat.toJson())
      .catch((err) => {
        // show an Errormessage
      })
      .then((doc: any) => {
        updateDoc(doc, { id: doc.id });
      });
  }

  onSnap(collection: string) {
    return onSnapshot(this.firestore.getCollectionRef(collection), (data) => {
      if (collection === 'chats') {
        this.getAllChats(data);
      } else {
        this.getAllChannels(data);
      }
    });
  }

  async getChat(collId: string, docId: string) {
    const docSnap = await getDoc(this.firestore.getDocumentRef(collId, docId));
    this.currentChat = docSnap.data();
  }

  getAllChats(data: QuerySnapshot<DocumentData, DocumentData>) {
    this.chats = [];
    data.forEach((doc) => {
      this.chats.push(doc.data());
    });
  }

  getAllChannels(data: QuerySnapshot<DocumentData, DocumentData>) {
    this.channels = [];
    data.forEach((doc) => {
      this.channels.push(doc.data());
    });
  }
}
