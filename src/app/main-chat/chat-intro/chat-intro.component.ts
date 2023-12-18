import { Component, inject } from '@angular/core';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { AvatarComponent } from '../../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-intro',
  standalone: true,
  templateUrl: './chat-intro.component.html',
  styleUrl: './chat-intro.component.scss',
  imports: [ChannelBoxComponent, AvatarComponent, CommonModule],
})
export class ChatIntroComponent {
  currentChat = {
    name: 'Entwicklerteam',
    description: 'Hier ist eine Beschreibung',
    access: 'public',
    creater: 'Frederik Beck',
  };
  chatSelected = 'channel';
  messageAmount = 2;
  ownChat = true;
  chatService!: ChatService;
  private openChatSub!: Subscription;

  constructor() {
    this.chatService = inject(ChatService);
  }
  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.chatSelected = data.chatColl;
      },
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }
}
