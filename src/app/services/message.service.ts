import { Injectable, inject } from '@angular/core';
import { Message } from '../models/message.class';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  firestore!: FirestoreService;
  chats!: Array<Message>;

  constructor() {
    this.firestore = inject(FirestoreService);
  }
}
