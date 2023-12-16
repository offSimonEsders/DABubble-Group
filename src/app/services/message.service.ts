import { Injectable } from '@angular/core';
import { Message } from '../models/message.class';

@Injectable({ providedIn: 'root' })
export class MessageService {
  chat!: Array<Message>;
}
