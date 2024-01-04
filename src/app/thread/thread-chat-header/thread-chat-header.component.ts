import { Component, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ToggleContainerService } from '../../services/toggle-container.service';

@Component({
  selector: 'app-thread-chat-header',
  standalone: true,
  templateUrl: './thread-chat-header.component.html',
  styleUrl: './thread-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule],
})
export class ThreadChatHeaderComponent {
  chatService!: ChatService;
  toggleContainerService!: ToggleContainerService;

  constructor() {
    this.chatService = inject(ChatService);
    this.toggleContainerService = inject(ToggleContainerService);
  }

  /**
   * The closeThread function toggles the width of the 'secondary-chat' element to '0px'.
   */
  closeThread() {
    this.toggleContainerService.toggle.next({
      element: 'secondary-chat',
      width: '0px',
    });
  }
}
