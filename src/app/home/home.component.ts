import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ThreadComponent } from '../thread/thread.component';

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
  ],
})
export class HomeComponent {}
