import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.class';

interface ToggleSubject {
  element: string;
  width: string;
  message?: Message;
}

@Injectable({ providedIn: 'root' })
export class ToggleContainerService {
  toggleSubject = new Subject<ToggleSubject>();
  displaySecondaryChat = false;
  displayChannelMenu = true;

  toggleContainer(sub: ToggleSubject) {
    this.toggleSubject.next(sub);
  }
}
