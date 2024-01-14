import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ThreadComponent } from '../thread/thread.component';
import { CreateChannelComponent } from '../nav-bar/create-channel/create-channel.component';
import { ToggleContainerService } from '../services/toggle-container.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

interface ToggleSub {
  element: string;
  width: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    MainChatComponent,
    NavBarComponent,
    ThreadComponent,
    CreateChannelComponent,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  toggleContainerService!: ToggleContainerService;
  toggleSub!: Subscription;
  elementRef = 'secondary-chat';
  width = '0px';

  constructor(private channel: ChatService, private auth:AuthService) {
    this.toggleContainerService = inject(ToggleContainerService);
    if(this.auth.profileViewAccount){
      this.auth.profileViewAccount = this.auth.getFromLocalStorage();
    }
  }

  /**
   * The ngOnInit function subscribes to an event and resizes the element of the emitted element reference based on the received width.
   */
  ngOnInit(): void {
    this.toggleSub = this.toggleContainerService.toggleSubject.subscribe({
      next: (data: ToggleSub) => {
        this.elementRef = data.element;
        this.width = data.width;
      },
    });
    this.channel.AllUserInChannel();
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
  }
}
