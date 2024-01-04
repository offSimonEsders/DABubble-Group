import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ThreadComponent } from '../thread/thread.component';
import { CreateChannelComponent } from '../nav-bar/create-channel/create-channel.component';
import { ToggleContainerService } from '../services/toggle-container.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.toggleContainerService = inject(ToggleContainerService);
  }

  /**
   * The ngOnInit function subscribes to an event and resizes the element of the emitted element reference based on the received width.
   */
  ngOnInit(): void {
    this.toggleSub = this.toggleContainerService.toggle.subscribe({
      next: (data: ToggleSub) => {
        this.elementRef = data.element;
        this.width = data.width;
      },
    });
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
  }
}
