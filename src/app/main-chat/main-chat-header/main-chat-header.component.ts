import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { CurrentChatIntroComponent } from '../current-chat-intro/current-chat-intro.component';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-chat-header',
  standalone: true,
  templateUrl: './main-chat-header.component.html',
  styleUrl: './main-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule, CurrentChatIntroComponent],
})
export class MainChatHeaderComponent implements OnInit, OnDestroy {
  chatService!: ChatService;
  private openChatSub!: Subscription;
  headerSelected = 'channel';
  members = [1, 2, 3];
  accountStatus = 'online';

  constructor() {
    this.chatService = inject(ChatService);
  }

  ngOnInit(): void {
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => (this.headerSelected = data.chatColl),
    });
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  translateAvatarElements(index: number) {
    if (index < 2 && this.members.length > 2) {
      return 'translateX(' + 20 / (index + 1) + 'px)';
    } else if (index < 1 && this.members.length === 2) {
      return 'translateX(' + 10 / (index + 1) + 'px)';
    } else {
      return 'translateX(0px)';
    }
  }
}
