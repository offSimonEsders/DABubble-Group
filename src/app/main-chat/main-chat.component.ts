import { Component, OnInit, inject } from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';
import { CommonModule } from '@angular/common';
import { ChatIntroComponent } from './chat-intro/chat-intro.component';
import { TimeSeparatorComponent } from './time-separator/time-separator.component';
import { MessageComponent } from '../shared/message/message.component';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  imports: [
    MessageBoxComponent,
    MainChatHeaderComponent,
    CommonModule,
    ChatIntroComponent,
    TimeSeparatorComponent,
    MessageComponent,
  ],
})
export class MainChatComponent implements OnInit {
  chatService!: ChatService;
  messageService!: MessageService;
  currentCollection: string = '';

  constructor() {
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
  }

  ngOnInit(): void {
    this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
      },
    });
  }
}
