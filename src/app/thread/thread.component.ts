import { Component } from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { MainChatHeaderComponent } from '../main-chat/main-chat-header/main-chat-header.component';
import { ThreadChatHeaderComponent } from './thread-chat-header/thread-chat-header.component';

@Component({
  selector: 'app-thread',
  standalone: true,
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss',
  imports: [MessageBoxComponent, ThreadChatHeaderComponent],
})
export class ThreadComponent {}
