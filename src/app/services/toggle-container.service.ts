import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.class';

@Injectable({ providedIn: 'root' })
export class ToggleContainerService {
  toggle = new Subject<{ element: string; width: string; message?: Message }>();
}
