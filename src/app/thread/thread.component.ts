import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { ThreadChatHeaderComponent } from './thread-chat-header/thread-chat-header.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../shared/message/message.component';
import { ToggleContainerService } from '../services/toggle-container.service';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { Answer } from '../models/answer.class';

@Component({
  selector: 'app-thread',
  standalone: true,
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss',
  imports: [
    MessageBoxComponent,
    ThreadChatHeaderComponent,
    CommonModule,
    MessageComponent,
  ],
})
export class ThreadComponent implements OnInit, OnDestroy {
  toggleContainerService!: ToggleContainerService;
  chatService!: ChatService;
  messageService!: MessageService;
  currentCollection = 'channels';
  message!: any;
  toggleSub!: Subscription;

  constructor() {
    this.toggleContainerService = inject(ToggleContainerService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
  }

  ngOnInit(): void {
    this.toggleSub = this.toggleContainerService.toggle.subscribe({
      next: (data) => {
        if (data.message) {
          this.message = data.message;
          this.messageService.setAnswers();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
  }
}
