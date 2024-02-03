import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MessageBoxComponent } from '../shared/message-box/message-box.component';
import { MainChatHeaderComponent } from './main-chat-header/main-chat-header.component';
import { CommonModule } from '@angular/common';
import { ChatIntroComponent } from './chat-intro/chat-intro.component';
import { TimeSeparatorComponent } from './time-separator/time-separator.component';
import { MessageComponent } from '../shared/message/message.component';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import { ToggleContainerService } from '../services/toggle-container.service';

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
  providers: [ MainChatHeaderComponent]
})
export class MainChatComponent implements OnInit, OnDestroy {
  chatService!: ChatService;
  messageService!: MessageService;
  toggleContainerService!: ToggleContainerService;
  private openChatSub!: Subscription;
  private loadedChatSub!: Subscription;
  currentCollection: string = '';
  @ViewChild('chat') container!: ElementRef;
  chatLoaded = false;

  constructor() {
    this.chatService = inject(ChatService);
    this.messageService = inject(MessageService);
    this.toggleContainerService = inject(ToggleContainerService);
  }

  // prettier-ignore
  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
      },
    });
    this.loadedChatSub = this.messageService.loadedMessagesEmitter.subscribe({
      next: () => {
        this.setAlignment();
      }
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
    this.loadedChatSub.unsubscribe();
  }

  // prettier-ignore
  setMessageBoxPadding() {
    return this.toggleContainerService.displayChannelMenu && this.toggleContainerService.displaySecondaryChat ? true : false;
  }

  // prettier-ignore
  setAlignment() {
    if(this.messageService.messages) {
      if (this.messageService.messages.length > 3) {
        this.container.nativeElement.style.justifyContent = 'flex-start';
        setTimeout(() => {
          this.container.nativeElement.scrollTo(0, this.container.nativeElement.scrollHeight);
        }, 100) 
      } else {
        this.container.nativeElement.style.justifyContent = 'flex-end';
      }
    }
  }

  // prettier-ignore
  setMarginToLastMessage(x: number, y: number) {
    let i = this.messageService.dispatchedDays.length - 1;
    let j = this.messageService.filteredMessages[i].length - 1;
    return x === i && y === j ? '63px' : '0px';
  }
}
