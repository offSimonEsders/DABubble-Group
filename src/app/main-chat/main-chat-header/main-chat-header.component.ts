import { Component } from '@angular/core';
import { AvatarComponent } from '../../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { CurrentChatIntroComponent } from '../current-chat-intro/current-chat-intro.component';

@Component({
  selector: 'app-main-chat-header',
  standalone: true,
  templateUrl: './main-chat-header.component.html',
  styleUrl: './main-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule, CurrentChatIntroComponent],
})
export class MainChatHeaderComponent {
  members = [1, 2, 3];
  accountStatus = 'online';

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
