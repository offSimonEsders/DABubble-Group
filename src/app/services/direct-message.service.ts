import { Injectable } from '@angular/core';
import { Message } from '../models/message.class';

@Injectable({ providedIn: 'root' })
export class DirectMessageService {
  chat!: Array<Message>;
}
