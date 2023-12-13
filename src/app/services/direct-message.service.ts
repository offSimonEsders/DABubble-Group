import { Injectable } from '@angular/core';
import { Message } from '../models/message.class';

@Injectable({ providedIn: 'root' })
export class DirectMessageService {
  chat!: Array<Message>;

  addMessage(message: Message) {
    this.chat.push(message);
  }

  getMessages() {
    return this.chat.slice(); // Gibt Kopie des Channel Arrays zurück
  }

  getMessage(index: number) {
    return this.chat[index];
  }

  updateMessage(index: number, message: Message) {
    this.chat[index] = message;
  }
}
