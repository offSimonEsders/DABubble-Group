import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { ThreadChatHeaderComponent } from './thread-chat-header/thread-chat-header.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../shared/message/message.component';
import { ToggleContainerService } from '../services/toggle-container.service';
import { MessageService } from '../services/message.service';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';

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
  @ViewChild('chat') container!: ElementRef;
  private loadedChatSub!: Subscription;

  constructor() {
    this.toggleContainerService = inject(ToggleContainerService);
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
  }

  // prettier-ignore
  ngOnInit(): void {
    this.toggleSub = this.toggleContainerService.toggleSubject.subscribe({
      next: (data) => {
        if (data.message) {
          this.message = data.message;
          this.messageService.setAnswers();
        }
      },
    });
    this.loadedChatSub = this.messageService.loadedAnswersEmitter.subscribe({
      next: () => {
        this.message.answerAmount = this.messageService.answers.length;
        setTimeout(() => {
          this.container.nativeElement.scrollTo(0, this.container.nativeElement.scrollHeight);
        }, 100)
      },
    });
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
    this.loadedChatSub.unsubscribe();
  }
}
